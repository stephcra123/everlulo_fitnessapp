import { Link } from "react-router";

function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>😟 This page does not exist. 😟</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

export default NotFound;
