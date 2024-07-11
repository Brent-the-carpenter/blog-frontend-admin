import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import PUTPost from "../fetch/PUTPost";
import useUserContext from "../context/useUserContext";
export default function useUpdatePost() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { postId } = useParams();
  const { token } = useUserContext();

  const updatePost = useCallback(
    async (update) => {
      try {
        const response = await PUTPost(postId, update, token);
        if (response) {
          setSuccess("Post updated successfully");
        }
      } catch (error) {
        setError(error.message);
      }
    },
    [postId, token]
  );
}
