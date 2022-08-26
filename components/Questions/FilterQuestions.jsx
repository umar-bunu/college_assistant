import React from "react";
import styles from "../../styles/Filter.module.css";
function FilterQuestions() {
  return (
    <div className={styles.main}>
      <div>Filter By</div>
      <div className={styles.school}>
        <span>School: </span>
        <select name="school" id="school">
          <option value="gsu_gombe">Gombe State University</option>
        </select>
        <button>Remove</button>
      </div>
      <div>
        <span>Session: </span>
        <button>Remove</button>
      </div>
    </div>
  );
}

export default FilterQuestions;
