import { useEffect, useRef, useState } from "react";
import useLogin from "../../api/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

function Login({ loginRef }) {
  const [userData, setUserData] = useState({ password: null, user_name: null });
  const [submit, setSubmit] = useState(false);
  const { loading, validationErrors, loginError, success, loginUser } =
    useLogin();
  const userNameRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (submit) {
      loginUser(userData);
      setSubmit(false);
    }
  }, [submit, userData, loginUser]);
  useEffect(() => {
    if (success) {
      loginRef.current = null;
      navigate("/");
    }
  }, [navigate, success, loginRef]);
  useEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }, []);
  const handleInputChange = (e, inputName) => {
    setUserData({ ...userData, [inputName]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setSubmit(true);
  };
  const getErrorMessage = (field) => {
    const error = validationErrors?.find((error) => error.path === field);
    return error ? error.msg : null;
  };

  return (
    <div>
      <form className="form" action="" method="POST" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="formControl">
          <label htmlFor="user_name">UserName:</label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            ref={userNameRef}
            onChange={(e) => {
              handleInputChange(e, "user_name");
            }}
          />
          {getErrorMessage("user_name") && (
            <p className="error">{getErrorMessage("user_name")}</p>
          )}
        </div>
        <div className="formControl">
          <label htmlFor="password"> Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              handleInputChange(e, "password");
            }}
          />
          {getErrorMessage("password") && (
            <p className="error">{getErrorMessage("password")}</p>
          )}
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Login in... " : "Log in"}
        </button>
        {loginError && <p>{loginError.message}</p>}
      </form>
    </div>
  );
}
Login.propTypes = {
  loginRef: propTypes.shape({
    current: propTypes.any,
  }).isRequired,
};
export default Login;
