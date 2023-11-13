import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Homepage.module.css";
import PropTypes from 'prop-types';
function Login({setToken}) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate=useNavigate();
  const handleSubmit = evt => {
    evt.preventDefault();
    const data = { email: email, password: password };
    fetch("http://sefdb02.qut.edu.au:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          setSuccessMessage("");
          const response2 = response.clone();
          return response
            .json()
            .then(text => {
              setErrorMessage("Error : " + text.message);
            })
            .then(text =>
              response2.text().then(text => {
                throw new Error(text);
              })
            );
        } else {
          return response.json().then(text => {
            setErrorMessage("");
            setSuccessMessage(text.message);
            setEmail("");
            setPassword("");
            navigate('/VolcanoList'); 
            setTimeout(() => {
              setToken(text.token);  
            }, 1000);
            
            //alert(JSON.stringify(text));
            
            
          });
        }
      })
      .then(data => {
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage != "" && (
        <div className={classes.error}> {errorMessage} </div>
      )}
      {successMessage != "" && (
        <div className={classes.success}> {successMessage} </div>
      )}
      <br />
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <input value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
Login.propTypes = {
  setToken: PropTypes.func.isRequired
};