import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "../styles/login.module.css";
function Register() {
  const [emailError, setemailError] = useState(null);
  const [passError, setpassError] = useState(null);
  const [loginError, setloginError] = useState(null);

  const logUserIn = async (e) => {
    e.preventDefault();
    setloginError(null);
    setemailError(null);
    setpassError(null);
    try {
      await createUserWithEmailAndPassword(
        getAuth(),
        e.target.userEmail.value,
        e.target.userPassword.value
      );
    } catch (ex) {
      console.log(ex);
      setloginError(ex.code);
    }
    // var validRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // if (!e.target.userEmail.value.match(validRegex)) {
    //   setemailError("Invalid email address");
    //   document.loginForm.userEmail.focus();

    //   return true;
    // } else {
    //   return false;
    // }
  };
  return (
    <div className={styles.main}>
      <h3>Welcome</h3>
      <div>Please fill in below to register</div>
      <form name="loginForm" onSubmit={logUserIn}>
        <div className={styles.inputDiv}>
          <label htmlFor="userEmail">Email</label>
          <input required type="email" name="userEmail" id="userEmail" />
          {emailError && <span>{emailError}</span>}
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="userPassword">Password</label>
          <input
            required
            type="password"
            name="userPassword"
            id="userPassword"
          />
          {passError && <span>{passError}</span>}
        </div>
        {loginError && <span>{loginError}</span>}
        <div>
          <button className={styles.submitBtn} type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
