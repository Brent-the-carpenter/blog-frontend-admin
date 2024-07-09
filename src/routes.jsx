import App from "./App";
import HomePage from "./components/HomePage/HomePage";
import CreatePost from "./components/CreatePost/CreatePostPage";
const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/createPost", element: <CreatePost /> },
    ],
  },
];
export default routes;
