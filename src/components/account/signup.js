import React, { useState } from "react";
import { auth } from '../../firebase';
import './auth.css'; // Import the CSS file
import { createUserWithEmailAndPassword,updateProfile,sendEmailVerification } from "firebase/auth";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( name && email && pass )
        {
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = auth.currentUser;
            updateProfile(user, {
                displayName: name
              })
            if(user.emailVerified === false)
            {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    alert(`Verify the link sent to ${email} before logging in`);
                });
            }
            props.onFormSwitch('login')
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode === "auth/weak-password")alert("Weak Password. Minimum 6 characters required")
            if (errorCode === "auth/email-already-in-use")alert("Account already  Exists")
            // ..
        });
        }
        else{
            alert("Input Fields Cannot be empty")
        }

    }

    const handleGenderSelection = (gender) => {
        setSelectedGender(gender);
      }
    

    return (
        <div style={{color:"black"}} className="auth-form-container" >
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <input style={{border: '0.5px solid grey'}} value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
            <input style={{border: '0.5px solid grey'}} value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Email Address" id="email" name="email" />
            <input style={{border: '0.5px solid grey'}} value={number}  pattern="[0-9]*" type="number" onChange={(e) => setNumber((v) => (e.target.validity.valid ? e.target.value : v))} placeholder="Phone Number" id="number" name="number" />
            <div style={{ marginBottom: '20px' }}>
            <button className={`gender-button ${selectedGender === 'male' ? 'selected' : ''}`} type="button" onClick={() => handleGenderSelection('male')}>Male</button>
            <button className={`gender-button ${selectedGender === 'female' ? 'selected' : ''}`} type="button" onClick={() => handleGenderSelection('female')}>Female</button>
            <button className={`gender-button ${selectedGender === 'others' ? 'selected' : ''}`} type="button" onClick={() => handleGenderSelection('others')}>Others</button>
            </div>
            <input style={{border: '0.5px solid grey',marginBottom:'20px'}} value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button style={{marginBottom:'20px'}} className="login-button" type="submit">Register</button>
        </form>
        <button style={{color:"black" }}  className="link-btn" onClick={() => props.onFormSwitch('login',name)}>Already have an account? Login here.</button>
    </div>
    )
}