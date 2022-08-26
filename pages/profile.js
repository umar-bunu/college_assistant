import React, { useContext, useEffect, useState } from "react";
import { getFirestore, getDoc, doc } from "firebase/firestore";

import styles from "../styles/Profile.module.css";
import { UserContext } from "./_app";
function Profile() {
  const userdata = useContext(UserContext);
  const [schooldata, setschooldata] = useState({ school: "", state: "" });
  const getschooldata = async () => {
    try {
      const docSnap = await getDoc(
        doc(getFirestore(), "schools", userdata.data.university)
      );
      setschooldata(
        docSnap.exists
          ? { school: docSnap.data().name, state: docSnap.data().state }
          : { school: "Not set", state: "Not set" }
      );
    } catch (ex) {
      setschooldata({ school: "error", state: "error" });
    }
  };
  useEffect(() => {
    if (userdata != null) getschooldata();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Profile Settings</h2>
      <div className={styles.main}>
        <div>Name: {userdata.data.name}</div>
        <div>Surname: {userdata.data.surname}</div>
        <div>Email: {userdata.data.email}</div>
        <div>
          <span>
            School: {schooldata.school} <br /> State: {schooldata.state}{" "}
          </span>
          <button>Change</button>
        </div>
        <div>department: {userdata.data.department}</div>
        <div>Total Uploads: {userdata.data.uploads}</div>
      </div>
    </div>
  );
}

export default Profile;
