import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";

import styles from "../../styles/courses/courses.module.css";
import { useRouter } from "next/router";

function Courses() {
  const [availableCourses, setavailableCourses] = useState([]);
  const [loadingError, setloadingError] = useState(null);

  const router = useRouter();

  const getCourses = async () => {
    try {
      const docs = await getDocs(collection(getFirestore(), "courses"));
      var temp = docs.docs;
      for (var i = 0; i < 20; i++) temp.push(temp[i]);
      setavailableCourses(
        temp.map((eachTemp) => ({ id: eachTemp.id, data: eachTemp.data() }))
      );
      // setavailableCourses(
      //   docs.docs.map((eachCourse) => ({
      //     id: eachCourse.id,
      //     data: eachCourse.data(),
      //   }))
      // );
    } catch (ex) {
      setloadingError(ex.code);
      console.log(ex);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <h3>Courses List</h3>
      {loadingError != null && <div>{loadingError} </div>}
      <div>
        {availableCourses.map((eachCourse, index) => (
          <div
            key={eachCourse.id + index}
            onClick={() => router.push("/courses/" + eachCourse.data.code)}
            className={styles.eachCourse}
          >
            {eachCourse.data.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
