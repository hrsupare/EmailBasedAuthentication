import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./Login.css"

const Login = () => {
    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")
    console.log(userName, password);
    const Nav = useNavigate()

    useEffect(() => {
        const data = localStorage.getItem("user")
        if (data) {
            Nav("/home")
        }
    })

    const logInUser = async function () {
        console.log("reach");
        let data = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ userName, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json()
        if (res.status === true) {
            localStorage.setItem("user", JSON.stringify(res))
            Nav("/home")
        } else {
            alert(res.message)
        }
       
    }



    return (
        <div className='Outer-Layer'>
            <div className='wrapper-box'>
                <h2> Login </h2>
                <form action='#'>
                    <div className='input-bx'>
                        <input type="text" defaultValue={userName} onChange={(event) => setuserName(event.target.value)} placeholder='User Name' />
                    </div>
                    <div className='input-bx'>
                        <input type="text" defaultValue={password} onChange={(event) => setpassword(event.target.value)} placeholder='Password' />
                    </div>
                    <div className='input-bx button'>
                        <input type="Submit" onClick={logInUser} defaultValue="Log In" />
                    </div>
                    <div className="text-Area">
                        <h3> If You Not Register <Link to='/register'>Register Now</Link></h3>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login