import "../styles/RegisterButton.css";
import { Link } from "react-router-dom";

function Register({ styleVariant, path }) {
  return (
    <Link to={path} style={{ textDecoration: "none", color: "white" }}>
      <button className={styleVariant}>REGISTER NOW</button>
    </Link>
  );
}

export default Register;
