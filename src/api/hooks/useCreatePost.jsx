import { useCallback, useState } from "react";
import POST_Blog from "../fetch/POSTBLOG";
import useUserContext from "../../context/userContext/userHook";

const useCreatePost = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useUserContext();

  const createPost = useCallback(
    async (blogData) => {
      try {
        const post = await POST_Blog(blogData, token);
        if (post) {
          setSuccess("Successfully posted blog!");
          setError(null);
        }
      } catch (error) {
        console.log(error.message);
        setError(error || "Error posting blog");
        setSuccess(null);
      }
    },
    [token]
  );
  return { error, success, createPost };
};

export default useCreatePost;
