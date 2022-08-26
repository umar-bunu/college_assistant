import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext } from "react";

import styles from "../styles/Navbar.module.css";
import { SignInContext } from "./Layout";
import { UserContext } from "../pages/_app";
function Navbar() {
  const userdata = useContext(UserContext);
  const router = useRouter();
  return (
    <div className={styles.mainDiv}>
      <span
        onClick={() => {
          router.replace("/");
        }}
        className={styles.navSpan}
      >
        Home
      </span>
      <span
        onClick={() => {
          router.replace("/profile");
        }}
        className={styles.navSpan}
      >
        Profile
      </span>
      <span
        onClick={() => {
          router.replace("/courses");
        }}
        className={styles.navSpan}
      >
        Courses
      </span>
      <span
        onClick={() => {
          router.replace("/");
        }}
        className={styles.navSpan}
      >
        Take a quiz
      </span>
      <button
        className={styles.signOutBtn}
        onClick={async () => {
          try {
            await signOut(getAuth());
            router.replace("/login");
          } catch (e) {}
        }}
      >
        {userdata == null ? "Sign In" : "Sign Out"}
      </button>
    </div>
  );
}

export default Navbar;
