import React from 'react'
import "./Verification.css"
import dummy from "./check.jpg"

const Verification = () => {

    return (
        <div className="profile-card">
            <div className="image">
                <img src={dummy} alt="" className="profile-img" />
            </div>
            <div className="text-data">
                <span className="msg"> User Your account has been activated successfully. You can now login."</span>
            </div>
        </div >
    )
}
export default Verification