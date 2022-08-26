import React, { useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "../styles/login.module.css";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
function Login() {
  const useuser = useContext(UserContext);

  const [emailError, setemailError] = useState(null);
  const [passError, setpassError] = useState(null);
  const [loginError, setloginError] = useState(null);

  const router = useRouter();

  const logUserIn = async (e) => {
    e.preventDefault();
    setloginError(null);
    setemailError(null);
    setpassError(null);
    try {
      const usercredential = await signInWithEmailAndPassword(
        getAuth(),
        e.target.userEmail.value,
        e.target.userPassword.value
      );

      router.push("/");
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
      <div>Please login to continue</div>
      <form name="loginForm" onSubmit={logUserIn}>
        <div className={styles.inputDiv}>
          <label htmlFor="userEmail">Email</label>
          <input type="email" name="userEmail" id="userEmail" />
          {emailError && <span>{emailError}</span>}
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="userPassword">Password</label>
          <input type="password" name="userPassword" id="userPassword" />
          {passError && <span>{passError}</span>}
        </div>
        {loginError && <span>{loginError}</span>}
        <div>
          <button className={styles.submitBtn} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
