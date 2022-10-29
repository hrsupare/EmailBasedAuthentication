import React from 'react'
import './Home.css'
import dummy from "./Dummy.jpg"

const Home = () => {
    const data = localStorage.getItem("user")
    const info = JSON.parse(data).information
    return (
        <div className="profileData">
            <div className="imageGround">
                <img src={dummy} alt="" className="profile-image" />
            </div>
            <div className="text">
                <span className="fname"> {info.firstName}</span>
                <br/>
                <span className="lname"> {info.lastName} </span>
            </div>
         <div className='extra-Info'>
                <h4>Hi, I am  {info.firstName + " " + info.lastName} <br /> {info.careerObjective}.</h4>
            </div>
        </div>
    )
}


export default Home