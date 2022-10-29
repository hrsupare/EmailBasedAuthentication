import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar.css"


function Navbar() {
    const data = localStorage.getItem("user")
    const Nav = useNavigate()
    const Logout = () => {
        localStorage.clear()
        Navbar("/login")
    }
    return (
        <nav>
            <div className="nav-content">
                {data ? <ul className="nav-links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link onClick={Logout} to="/login">Logout</Link></li>
                </ul>
                    :
                    <ul className="nav-links">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">SignUp</Link></li>
                    </ul>
                }
            </div>
        </nav >
    )
}
export default Navbar