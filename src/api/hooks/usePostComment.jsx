import POST_Comment from "../fetch/POST_Comment";
import useUserContext from "../../context/userContext/useUserContext";
import { useState, useCallback } from "react";
import { DateTime } from "luxon";
const usePostComment = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(false);
  const [postComments, setPostComments] = useState(null);
  const [posting, setPosting] = useState(null);
  const { token } = useUserContext();
  const postComment = useCallback(
    async (postId, commentMessage) => {
      setPosting(true);
      const comment = { message: commentMessage };
      try {
        const Comments = await POST_Comment(postId, token, comment);
        Comments.map((comment) => {
          comment.time_stamp = DateTime.fromISO(comment.time_stamp).toFormat(
            "MM/dd/yyyy"
          );
        });
        setSuccess("Comment posted successfully");
        setPostComments(Comments);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setPosting(false);
      }
    },
    [token]
  );
  return { postComment, success, error, postComments, posting };
};
export default usePostComment;
