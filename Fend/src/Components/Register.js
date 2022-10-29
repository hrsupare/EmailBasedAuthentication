import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Register.css"

const Register = () => {

    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [careerObjective, setCareerObjective] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const Nav = useNavigate()

    useEffect(() => {
        const data = localStorage.getItem("user")
        if (data) {
            Nav("/home")
        }
    })

    const Registration = async () => {
        let data = await fetch("http://localhost:5000/registration", {
            method: "post",
            body: JSON.stringify({ firstName, lastName, careerObjective, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json()

        alert(res.message)

    }



    return (
        <div className='Outer'>
            <div className='wrapper'>
                <h2> Registration</h2>
                <form action='#' >
                    <div className='input-box' >
                        <input type="text" defaultValue={firstName} onChange={(event) => setfirstName(event.target.value)} placeholder='First Name' />
                    </div>
                    <div className='input-box'>
                        <input type="text" defaultValue={lastName} onChange={(event) => setlastName(event.target.value)} placeholder='Last Name' />
                    </div>
                    <div className='input-box'>
                        <input type="text" defaultValue={careerObjective} onChange={(event) => setCareerObjective(event.target.value)} placeholder='Career Objective' />
                    </div>
                    <div className='input-box'>
                        <input type="text" defaultValue={email} onChange={(event) => setemail(event.target.value)} placeholder='Email' />
                    </div>
                    <div className='input-box'>
                        <input type="text" defaultValue={password} onChange={(event) => setpassword(event.target.value)} placeholder='Password' />
                    </div>
                    <div className='input-box button'>
                        <input onClick={Registration} type="Submit" defaultValue="Register Now" />
                    </div>
                    <div className="text">
                        <h3> Already Have an Account <Link to='/login'>Login Now</Link></h3>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register
