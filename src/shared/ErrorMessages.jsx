//fulfill child prop requirement
import styles from "./ErrorMessages.module.css";
function ErrorMessage({ onDismiss, children }) {
  return (
    <div className="error">
      <hr />
      <p>{children}</p>
      <Button onClick={onDismiss}>Dismiss</Button>
    </div>
  );
}

export default ErrorMessage;
