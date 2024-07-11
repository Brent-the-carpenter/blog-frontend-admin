import useUserContext from "../../context/userContext/userHook";
import { Link } from "react-router-dom";
function HomePage() {
  const { token, userName } = useUserContext();
  return (
    <div className=" flex-1">
      <h1 className="text-4xl">Welcome to Carpenters Blog editor!</h1>

      {token ? (
        <>
          <h2 className="text-2xl">How are you doing today {userName}</h2>
          <br />
          <h3>Most top five most liked blogs</h3>
          <div></div>
        </>
      ) : (
        <h2>Please login to create a post</h2>
      )}
    </div>
  );
}
export default HomePage;
