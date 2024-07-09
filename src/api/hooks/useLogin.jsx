import { useCallback, useState } from "react";
import Login from "../fetch/POSTLogin";
import useUserContext from "../../context/contextHooks/userHook";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setUser } = useUserContext();

  const loginUser = useCallback(
    async (loginData) => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      setLoading(true);
      setValidationErrors(null);
      setLoginError(null);
      try {
        const loginResponse = await Login(loginData, signal);
        if (loginResponse.token) {
          const userData = {
            userName: loginData.user_name,
            token: loginResponse.token,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          setSuccess(true);
        }
      } catch (error) {
        if (error.errors) {
          setValidationErrors(error.errors);

          setSuccess(false);
          console.log(error.errors);
        } else {
          console.log(error);
          console.log("error msg:", error.message);
          setSuccess(false);
          setLoginError(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [setUser]
  );
  return { loading, validationErrors, loginError, success, loginUser };
};

export default useLogin;
