import { createContext, useEffect, useMemo, useState } from "react";
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
        setUser({ userName: parsedUser.userName, token: parsedUser.token });
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
