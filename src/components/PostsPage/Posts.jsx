import PropTypes from "prop-types";
import usePostsContext from "../../context/postsContext/usePostsContext";

import PostCard from "./PostCard";
import { useEffect, useState } from "react";

function Posts() {
  const { posts, loading, error } = usePostsContext();
  const [updatePosts, setUpdatePosts] = useState(false);
  const [deletePostMsg, setDeletePostMsg] = useState(null);
  useEffect(() => {
    if (updatePosts) {
      setUpdatePosts(false);
    }
  }, [updatePosts]);

  useEffect(() => {
    if (deletePostMsg) {
      console.log("Setting timer to clear deletePostMsg");
      const timer = setTimeout(() => {
        setDeletePostMsg(null);
        setUpdatePosts(true);
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  });
  if (loading) return <div>Loading....</div>;
  if (error)
    return <h1 className="text-3xl">Error fetching posts: {error.message}</h1>;

  return (
    <div className="mt-2 flex flex-1 flex-col items-center gap-2">
      <h1 className="text-2xl font-extrabold">Posts</h1>
      {deletePostMsg && <p className="error-message">{deletePostMsg}</p>}

      {}
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            setUpdatePosts={setUpdatePosts}
            deletePostMsg={deletePostMsg}
            setDeletePostMsg={setDeletePostMsg}
          />
        ))
      ) : (
        <h2 className="h-full">There are no posts!</h2>
      )}
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      author: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
};

export default Posts;
