import App from "./App";
import HomePage from "./components/HomePage/HomePage";
import CreatePost from "./components/CreatePost/CreatePostPage";
import Posts from "./components/PostsPage/Posts";
import PostPage from "./components/postPage/postPage";
const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/createPost", element: <CreatePost /> },
      { path: "/posts", element: <Posts /> },
      { path: "/posts/:postId", element: <PostPage /> },
    ],
  },
];
export default routes;
