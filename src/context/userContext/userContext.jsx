import { createContext, useEffect, useMemo, useState } from "react";
import checkToken from "../../api/fetch/GetCheckToken";
import propTypes from "prop-types";

export const UserContext = createContext({
  userName: null,
  token: null,
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userName: null, token: null });

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        try {
          const checkTokenResponse = await checkToken(parsedUser.token);
          if (
            checkTokenResponse.status === 200 ||
            checkTokenResponse.status === 304
          ) {
            setUser({ userName: parsedUser.userName, token: parsedUser.token });
          } else {
            localStorage.removeItem("user");
            setUser({ userName: null, token: null });
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("user");
          setUser({ userName: null, token: null });
        }
      } else {
        setUser({ userName: null, token: null });
      }
    };
    fetchUser();
  }, []);

  const value = useMemo(() => ({ ...user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
};

export default UserProvider;
