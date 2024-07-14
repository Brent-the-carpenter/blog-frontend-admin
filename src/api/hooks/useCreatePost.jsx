import { useCallback, useState } from "react";
import POST_Blog from "../fetch/POSTBLOG";
import useUserContext from "../../context/userContext/userHook";
import usePostsContext from "../../context/postsContext/usePostsContext";
const useCreatePost = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useUserContext();
  const { addPost } = usePostsContext();

  const createPost = useCallback(
    async (blogData) => {
      try {
        const post = await POST_Blog(blogData, token);
        if (post) {
          setSuccess("Successfully posted blog!");
          addPost(post);
          setError(null);
        }
      } catch (error) {
        console.log(error);
        setError(error || "Error posting blog");
        setSuccess(null);
      }
    },
    [token, addPost]
  );
  return { error, success, createPost };
};

export default useCreatePost;
