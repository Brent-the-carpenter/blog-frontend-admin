import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DeleteModel from "../deleteModel/delete";
import { useState } from "react";

export default function PostCard({ post, setDeletePostMsg }) {
  const [showPostDelete, setShowPostDelete] = useState(false);

  const toggleDelete = () => {
    setShowPostDelete(!showPostDelete);
  };

  return (
    <>
      <div
        className="postCard gap-4 w-3/4  max-sm:flex-col-reverse"
        key={post._id}
      >
        <div className="flex justify-center flex-col gap-2">
          <button
            className="btn col-start-4 row-start-3 row-end-4 justify-self-center"
            onClick={toggleDelete}
          >
            Delete post
          </button>
          <Link
            to={`/posts/${post._id}/update`}
            className="btn col-start-6 row-start-3 row-end-4 justify-self-center"
          >
            Update post
          </Link>
          <Link
            to={`/posts/${post._id}`}
            className="btn col-start-5 row-start-3 row-end-4 justify-self-center"
          >
            View post
          </Link>
        </div>
        <div className="flex flex-col flex-grow gap-2 p-2">
          <h2 className="text-xl">{post.title}</h2>
          <div>
            <h3>Written by: {post.author.first_name}</h3>
            <p>Created on: {post.createdAt}</p>
            <p>❤️{post.likes}</p>
          </div>
        </div>
        <div className="flex justify-center align-middle">
          <img src={post?.thumbNail} alt="Thumbnail" />
        </div>
      </div>
      {showPostDelete && (
        <DeleteModel
          key={post._id} // Adding a key prop here might not be necessary but ensures uniqueness
          setShowPostDelete={setShowPostDelete}
          postId={post._id}
          setDeletePostMsg={setDeletePostMsg}
        />
      )}

      <hr className="w-3/4 max-sm:w-full" />
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    thumbNail: PropTypes.string,
    likes: PropTypes.number,
    author: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setDeletePostMsg: PropTypes.func.isRequired,
};
