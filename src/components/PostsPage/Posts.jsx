import PropTypes from "prop-types";
import usePostsContext from "../../context/postsContext/usePostsContext";

import PostCard from "./PostCard";

function Posts() {
  const { posts, loading, error } = usePostsContext();

  if (loading) return <div>Loading....</div>;
  if (error)
    return <h1 className="text-3xl">Error fetching posts: {error.message}</h1>;

  console.log("error in post.jsx", error);

  return (
    <div className="mt-2 flex flex-1 flex-col items-center gap-2">
      <h1 className="text-2xl font-extrabold">Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post) => PostCard({ post }))
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
