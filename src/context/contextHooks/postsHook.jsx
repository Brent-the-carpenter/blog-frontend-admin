import { useContext } from "react";
import { PostsContext } from "../postsContext";

const usePostsContext = () => useContext(PostsContext);

export default usePostsContext;
