import likePOST from "../fetch/POSTLikePost";
import { useState, useCallback } from "react";
import useUserContext from "../../context/userContext/userHook";
const useLikePost = () => {
  const [like, setLike] = useState(false);
  const [success, setSuccess] = useState(false);
  const [likeError, setError] = useState(null);
  const [PostLikes, setPostLikes] = useState(null);
  const { token } = useUserContext();
  const likePost = useCallback(
    async (postID) => {
      try {
        const data = await likePOST(postID, token);
        setLike(true);
        setSuccess("Post liked successfully");
        setPostLikes(data.likes);
      } catch (error) {
        console.log("error in like post", error.status);
        if (error.status === 401) {
          setError("You must be logged in to like a post");
        } else {
          setError(error.message);
        }
      }
    },
    [token]
  );
  return { like, success, likeError, PostLikes, likePost };
};
export default useLikePost;
