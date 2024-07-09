import "./App.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import UserProvider from "./context/userContext";
import PostsProvider from "./context/postsContext";
function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      window.me;
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [theme]);
  return (
    <div className=" flex flex-col gap-2 h-full">
      <UserProvider>
        <Header theme={theme} setTheme={setTheme} />
        <PostsProvider>
          <Outlet />
        </PostsProvider>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
