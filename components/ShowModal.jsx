import React from "react";
import styles from "../styles/ShowModal.module.css";
function ShowModal({ title, content, action, setshouldShowModal }) {
  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <div>{content}</div>
        <div className={styles.actionButtons}>
          <button
            onClick={() => {
              setshouldShowModal(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              action();
            }}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowModal;
