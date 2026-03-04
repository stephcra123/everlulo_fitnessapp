//Second Shared Component
import styles from "./Button.module.css";

function Button({ onClick, disabled, type = "button", children }) {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
