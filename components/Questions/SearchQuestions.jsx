import React, { useRef, useState } from "react";
import styles from "../../styles/SearchQuestions.module.css";
function SearchQuestions({ searchQuestion }) {
  const searchKey = useRef("");
  const [selectedOption, setselectedOption] = useState(1);
  return (
    <div className={styles.searchSection}>
      <input ref={searchKey} type="text" />
      <div className={styles.type}>
        <button
          className={selectedOption == 1 && styles.active}
          onClick={() => setselectedOption(1)}
        >
          Related Topic
        </button>
        <button
          className={selectedOption == 2 && styles.active}
          onClick={() => setselectedOption(2)}
        >
          Course
        </button>
      </div>
      <button>Search</button>
    </div>
  );
}

export default SearchQuestions;
