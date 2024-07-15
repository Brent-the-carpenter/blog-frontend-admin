import { useCallback, useState } from "react";
import logout from "../fetch/POSTLogout";
import useUserContext from "../../context/userContext/useUserContext";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { token, setUser } = useUserContext();
  const navigate = useNavigate();
  const logoutUser = useCallback(async () => {
    try {
      const response = await logout(token);
      if (response) {
        setUser({ token: null, userName: null });
        localStorage.removeItem("user");
        setSuccess(response.message);
        navigate("/");
      }
    } catch (error) {
      if (error.status === 401) {
        setUser({ token: null, userName: null });
        localStorage.removeItem("user");
        setSuccess("You have been logged out");
      }
      console.error("Error:", error.status);
      setError(error.message);
    }
  }, [token, setUser, navigate]);

  return { success, error, logoutUser, setSuccess };
};

export default useLogout;
