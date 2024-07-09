import { useState, useCallback } from "react";
import signUp from "../fetch/POSTSignUp";

const useSignUp = () => {
  const [user, setUser] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const signUpUser = useCallback(async (formData) => {
    setLoading(true);
    setSignUpError(null);
    setValidationErrors([]);

    try {
      const user = await signUp(formData);
      setUser(user);
      const userInfo = { token: user.token, userName: formData.user_name };
      localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (error) {
      if (error.status === 400) {
        setValidationErrors(error.errors);
        console.log(error.errors);
      } else {
        setSignUpError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { signUpUser, loading, signUpError, validationErrors, user };
};

export default useSignUp;
