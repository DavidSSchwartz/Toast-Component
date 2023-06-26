import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts, handleDismissToast }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ message, variant, id }, index) => {
        return (
          <li className={styles.toastWrapper} key={id}>
            <Toast variant={variant} handleDismiss={handleDismissToast} id={id}>
              {message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
