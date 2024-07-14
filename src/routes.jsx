import App from "./App";
import HomePage from "./components/HomePage/HomePage";
import CreatePostPage from "./components/CreatePost/CreatePostPage";
import PostsPage from "./components/PostsPage/Posts";
import PostPage from "./components/postPage/postPage";
import UpdatePostPage from "./components/updatePost/updatePostPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage"; // Create a dedicated 404 component

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />, // Use a dedicated 404 component
    children: [
      { index: true, element: <HomePage /> },
      { path: "createPost", element: <CreatePostPage /> },
      { path: "posts", element: <PostsPage /> },
      { path: "posts/:postId", element: <PostPage /> },
      { path: "posts/:postId/update", element: <UpdatePostPage /> },
    ],
  },
];

export default routes;
