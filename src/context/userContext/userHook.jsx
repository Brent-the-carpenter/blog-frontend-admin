import { useContext } from "react";
import { UserContext } from "./userContext";

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
