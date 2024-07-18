import { Link } from "react-router-dom";
import Login from "../Login/Login";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import useUserContext from "../../context/userContext/useUserContext";
import useLogout from "../../api/hooks/useLogout";
import defaultAvatar from "../../assets/user.png";
function Header({ setTheme, theme }) {
  const [showLogin, setShowLogin] = useState(false);
  const loginRef = useRef(null);
  const linkRef = useRef(null);
  const { userName, token, avatar } = useUserContext();
  const { success, error, logoutUser, setSuccess } = useLogout();
  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    if (success) {
      const timeOut = setTimeout(() => {
        setSuccess(null);
      }, 1000);
      return () => clearTimeout(timeOut);
    }
  }, [setSuccess, success]);

  const toggleLogin = () => {
    setShowLogin((prev) => !prev);
    if (!showLogin) {
      setTimeout(() => loginRef.current.focus(), 0); // Ensure the login div gets focus
    }
  };

  const handleBlur = (e) => {
    if (
      e.relatedTarget !== linkRef.current &&
      (!loginRef.current || !loginRef.current.contains(e.relatedTarget))
    ) {
      setShowLogin(false);
    }
  };

  return (
    <div className="flex flex-col">
      <header className="flex flex-wrap justify-center gap-2 border-b-stone-300 pb-7 pl-7 pr-7 align-middle dark:border-b-stone-300">
        <h1 className="align-center flex flex-grow items-center justify-center pt-1 text-4xl font-bold underline underline-offset-1">
          The Carpenters Blog
        </h1>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-end gap-4 pt-8 max-sm:justify-center">
            {token ? (
              <img
                src={avatar || defaultAvatar}
                alt="user avatar"
                className="h-10 w-10 rounded-full"
              />
            ) : null}
            <div className="text-xl font-bold">{userName}</div>
            {token && (
              <Link to={"#"} className="link" onClick={logoutUser}>
                Logout
              </Link>
            )}
          </div>
          <hr />
          <nav className="min-w-80 flex-1 content-end">
            <ul className="items center flex items-start justify-end gap-5 text-lg max-sm:justify-center">
              {!userName && token && (
                <Link to={"signup"} className="link">
                  Sign Up
                </Link>
              )}

              {token ? (
                <Link to={"/"} className="link">
                  Home
                </Link>
              ) : (
                <Link
                  to="#"
                  onClick={toggleLogin}
                  ref={linkRef}
                  className="linkUserAction"
                >
                  Login
                </Link>
              )}
              {token && (
                <Link to={"createPost"} className="link">
                  Create Post
                </Link>
              )}
              {token && (
                <Link className="link" to={"posts"}>
                  Posts
                </Link>
              )}
              <button onClick={changeTheme}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </ul>
          </nav>
        </div>

        {showLogin && !token && (
          <div
            ref={loginRef}
            tabIndex={-1}
            className="flex justify-center"
            onBlur={handleBlur}
          >
            <Login loginRef={loginRef} />
          </div>
        )}
      </header>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Header;
