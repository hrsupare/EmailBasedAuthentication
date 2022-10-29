const userModel = require("../model/userModel")
const shortid = require("shortid")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
//pggvqxwjidnadeuf
//trackuth@1234
// trackuth@76587988
//wsryqilsziukwtsn

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "trackuth1234@gmail.com",
        pass: "wsryqilsziukwtsn"
    }
})

const isValidData = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true
}
const registerUser = async (req, res) => {
    const data = req.body
    const { firstName, lastName, careerObjective, email, password } = data
    try {

        //First Name Validation
        if (!isValidData(firstName)) {
            return res.status(400).send({
                status: false,
                message: "please Enter Your First Name"
            })
        }
        if (!/^\s*[a-zA-Z ]{2,}\s*$/.test(firstName)) {
            return res.status(400).send({
                status: false,
                message: `Heyyy....! ${firstName} is not a valid first name`,
            });
        }
        data.firstName = firstName.trim().split(" ").filter((word) => word).join(" ");

        //Last Name Validation
        if (!isValidData(lastName)) {
            return res.status(400).send({
                status: false,
                message: "please Enter Your Last Name"
            })
        }
        if (!/^\s*[a-zA-Z ]{2,}\s*$/.test(lastName)) {
            return res.status(400).send({
                status: false,
                message: `Heyyy....! ${lastName} is not a valid Last name`,
            });
        }
        data.lastName = lastName.trim().split(" ").filter((word) => word).join(" ");

      
        if (!isValidData(careerObjective)) {
            return res.status(400).send({
                status: false,
                message: "please Enter Your Career Objective"
            })
        }
        if (!/^\s*[a-zA-Z0-9/.+@!,  ]{2,}\s*$/.test(careerObjective)) {
            return res.status(400).send({
                status: false,
                message: `Heyyy....! career Objective is not a valid Format`,
            });
        }
        data.careerObjective = careerObjective.trim().split(" ").filter((word) => word).join(" ");

        //email Validation

        if (!isValidData(email)) {
            return res.status(400).send({
                status: false,
                message: "please Enter Your Email"
            })
        }
        if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.trim())) {
            return res.status(400).send({
                status: false,
                message: `Heyyy....! ${email} is not a valid email`
            });
        }

        const dupEmail = await userModel.findOne({ email: email })
        if (dupEmail) {
            return res.status(400).send({
                status: false,
                message: `${email} email is Already Register`
            })
        }
        data.email = email.trim();

        //validate PassWord
        if (!isValidData(password)) {
            return res.status(400).send({
                status: false,
                message: "please enter Password....!",
            });
        }
        if (!/^[a-zA-Z0-9@*&$#!]{8,15}$/.test(password)) {
            return res.status(400).send({
                status: false,
                message: "please enter valid password min 8 or max 15 digit",
            });
        }

        //create shortid
        const verifyCode = shortid.generate()
        const base = "http://localhost:5000/varification";
        const verifyLink = base + "/" + verifyCode

        data.shortid = verifyCode;
        data.verifyLink = verifyLink


        // mail sending 

        let details = {
            from: "trackuth1234@gmail.com",
            to: email,
            subject: "user Verification",
            text: `Hi ${firstName} We just need to verify your account before you can access EmailBasedAuth
            Verify your by clicking on the link : ${verifyLink}
            Thanks || The EmailBasedAuth`
        }

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log("its an Error ", err)
            } else {
                console.log(`mail send successfully on ${email}`);
            }
        })

        const createUser = await userModel.create(data)
        console.log(createUser);
        return res.status(201).send({ status: true, data: createUser, message: "Thanks for being awesome!!!! registration done successfully" })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: err.message })

    }

}


const userVerification = async (req, res) => {
    const data = req.params.shortid

    try {
        const findInDB = await userModel.findOne({ shortid: data })
        if (!findInDB) {
            return res.status(404).send({ status: false, message: "Invalid Link" })
        }
        if (findInDB.verified === true) {
            return res.status(302).redirect("http://localhost:3000/login");
        }

        const updatekey = await userModel.findOneAndUpdate({ shortid: data }, { verified: true }, { new: true })

        return res.status(302).redirect("http://localhost:3000/login");

        

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const userlogin = async (req, res) => {
    const data = req.body
    const { userName, password } = data
    try {
        //userName Validation

        if (!isValidData(userName)) {
            return res.status(400).send({
                status: false,
                message: "please Enter Your Email as UserName"
            })
        }
        if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(userName)) {
            return res.status(400).send({
                status: false,
                message: `Heyyy....! ${userName} is not a valid Username`
            });
        }
        const findInDB = await userModel.findOne({ email: userName })
        if (!findInDB) {
            return res.status(404).send({
                status: false,
                message: `Heyyy....! ${userName} is not a Registered User`
            });
        }
        if (!isValidData(password)) {
            return res.status(400).send({
                status: false,
                message: "please Enter Your password"
            })
        }
        if (findInDB.password !== password) {
            return res.status(400).send({
                status: false,
                message: `Heyyy....!  Your Password Is wrong `
            });
        }

        if (findInDB.verified === false) {
            return res.status(200).send({
                status: false,
                message: `Heyyy....! Account is not Verified check Mail Inbox`
            });

        }
        const token = jwt.sign(
            {
                userId: findInDB._id,
                project: "EmailBasedAuth"
            }, "I-AM-A-KEY"
        )
        res.setHeader("I-AM-A-KEY", token)
        const info = {
            firstName: findInDB.firstName,
            lastName: findInDB.lastName,
            careerObjective: findInDB.careerObjective
        }


        return res.status(200).send({ status: true, message: "user Login Successfully", information: info, token: token })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
module.exports = { registerUser, userVerification, userlogin }