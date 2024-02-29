import React, { useState } from 'react';
import { signInWithEmailAndPassword,signOut} from "firebase/auth";
import { auth } from '../../firebase';
import './auth.css'; // Import the CSS file


export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = auth.currentUser;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a login process (you can replace this with actual authentication logic)
    // For simplicity, assume successful login if email and pass are not empty
    if (email !== '' && pass !== '') {
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = auth.currentUser;
            if( user.emailVerified === true)setIsLoggedIn(true);
            else  alert(`Verify the link sent to <strong>${email}</strong> before logging in`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            if (errorCode === "auth/too-many-requests")alert("Too many requests please try again after sometime")
            if (errorCode === "auth/wrong-password")alert("Please Verify the Password")
            if (errorCode === "auth/user-not-found")alert("Please Verify the Username")
            //alert(error.code)
        });
    }
    else{
        alert("Input Fields cannot be Empty")
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
    // Sign-out successful.
    setEmail('');
    setPass('');
    setIsLoggedIn(false);
    }).catch((error) => {
        // An error happened.
        alert(error.message)
    });
  };

    if ( user &&  isLoggedIn === false) {
       if( user.emailVerified === true) setIsLoggedIn(true);
    }

  // Conditionally render the login form or the logged-in content based on isLoggedIn
  if (isLoggedIn) {
    return (
      <div>
        <h2 style={{ color: "black" ,padding:"10rem 0 5rem 0"}}>Welcome &nbsp;{user.displayName}&nbsp; , You are Logged In!</h2>
        <button  className="login-button" style={{ border: '0.5px solid #c4abed',width:"500px" }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div style={{ color: 'black' }} className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            style={{ border: '0.5px solid grey' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <input
            style={{ border: '0.5px solid grey', marginBottom: '20px' }}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button  className="login-button" type="submit">
            Log In
          </button>
        </form>
        <button style={{ color: 'black' }} className="link-btn" onClick={() => props.onFormSwitch('register')}>
          Don't have an account? Register here.
        </button>
      </div>
    );
  }
};
