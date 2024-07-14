import useUserContext from "../../context/userContext/userHook";
import DELETEPost from "../fetch/DELETEPost";
import { useState, useCallback } from "react";

const useDeletePost = () => {
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useUserContext();

  const deletePost = useCallback(
    async (postId) => {
      setLoading(true);
      setSuccess(null); // Reset success state on new delete attempt
      setError(null); // Reset error state on new delete attempt

      try {
        const response = await DELETEPost(postId, token);
        return response.message || "Post deleted successfully";
      } catch (error) {
        console.error("Error caught in deletePost:", error); // Log the error
        if (error.status === 401) {
          console.log("error.status === 401", error.status);
          return "You are not authorized to delete this post";
        } else {
          return error.message || "An error occurred while deleting the post";
        }
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { success, loading, error, deletePost };
};

export default useDeletePost;
