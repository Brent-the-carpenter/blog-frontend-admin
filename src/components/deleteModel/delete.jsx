import PropTypes from "prop-types";
import useDeletePost from "../../api/hooks/useDeletePost";
import usePostsContext from "../../context/postsContext/usePostsContext";
const DeleteModel = ({ setShowPostDelete, postId, setDeletePostMsg }) => {
  const { deletePost } = useDeletePost();
  const { deletePostById } = usePostsContext();
  const handleClose = () => {
    setShowPostDelete(false);
  };

  const handleDelete = async () => {
    setDeletePostMsg("deleting post...");
    try {
      const result = await deletePost(postId);
      setDeletePostMsg(result);
      setShowPostDelete(false);
      deletePostById(postId);
    } catch (error) {
      setDeletePostMsg(error.message);
    }
  };

  return (
    <div className="modal-main">
      <section className="modal-content">
        <h2>Are you sure you want to delete this post?</h2>
        <div className="flex gap-2 justify-center">
          <button className="btn" onClick={handleDelete}>
            Yes
          </button>
          <button className="btn" onClick={handleClose}>
            No
          </button>
        </div>
      </section>
    </div>
  );
};

DeleteModel.propTypes = {
  setShowPostDelete: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  setDeletePostMsg: PropTypes.func.isRequired,
};

export default DeleteModel;
