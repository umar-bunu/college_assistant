import React from "react";
import styles from "../../styles/EachQuestion.module.css";
function EachQuestion({ questionData }) {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <span className={styles.session}>{questionData.data.session}</span>
        <span className={styles.school}>{questionData.data.school}</span>
      </div>
      <div className={styles.section}>
        <span className={styles.question}>{questionData.data.question}</span>
        <span>({questionData.data.type})</span>
      </div>
    </div>
  );
}

export default EachQuestion;
