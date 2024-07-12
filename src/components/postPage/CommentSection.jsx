import PropTypes from "prop-types";
import usePostComment from "../../api/hooks/usePostComment";
import { useEffect, useState } from "react";

function CommentSection({ postId, comments }) {
  const [localComments, setLocalComments] = useState(comments);
  const [comment, setComment] = useState("");
  const { postComment, success, error, postComments, posting } =
    usePostComment();

  useEffect(() => {
    if (postComments) {
      setLocalComments(
        [...postComments].sort(
          (a, b) => new Date(b.time_stamp) - new Date(a.time_stamp)
        )
      );
    }
  }, [postComments]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    await postComment(postId, comment);
    setComment("");
  };

  return (
    <div className="comments flex flex-col gap-4">
      <h1 className="text-4xl">Comments</h1>

      <div className="flex flex-col gap-4 p-4">
        {localComments.map((comment) => (
          <div
            className="comment flex flex-col gap-2 border-b-2 p-2"
            key={comment.id}
          >
            <div className="flex justify-between">
              <strong>{comment.user.user_name}</strong>

              <strong>{comment.time_stamp}</strong>
            </div>
            <div>{comment.message}</div>
          </div>
        ))}

        <div className="flex-2 flex justify-center gap-6">
          <textarea
            className="flex-1"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            aria-label="Add a comment"
          />
          {posting ? (
            <div>Posting...</div>
          ) : (
            <button
              onClick={handlePostComment}
              className="btn h-14 self-end p-2"
            >
              Post
            </button>
          )}
        </div>
        {success && <div className="text-green-500">{success}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      user: PropTypes.shape({
        user_name: PropTypes.string.isRequired,
      }).isRequired,
      time_stamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CommentSection;
