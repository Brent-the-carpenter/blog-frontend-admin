import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import useGetPosts from "../../api/hooks/useGetPosts";
import { DateTime } from "luxon";

export const PostsContext = createContext({
  posts: [],
  loading: true,
  error: null,
});

const PostsProvider = ({ children }) => {
  const { posts: fetchedPosts, loading, error } = useGetPosts();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (Array.isArray(fetchedPosts)) {
      const formatted = fetchedPosts.map((post) => ({
        ...post,
        createdAt: DateTime.fromISO(post.createdAt).toFormat("MM/dd/yyyy"),
      }));
      setPosts(formatted);
    }
  }, [fetchedPosts]);

  const deletePostById = useCallback((postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  }, []);
  const addPost = useCallback((post) => {
    post.createdAt = DateTime.fromISO(post.createdAt).toFormat("MM/dd/yyyy");
    setPosts((prevPosts) => [...prevPosts, post]);
  }, []);
  const updatePost = useCallback((updatedPost) => {
    updatedPost.createdAt = DateTime.fromISO(updatedPost.createdAt).toFormat(
      "MM/dd/yyyy"
    );
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      posts,
      loading,
      error,
      deletePostById,
      addPost,
      updatePost,
    }),
    [posts, loading, error, deletePostById, addPost, updatePost]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PostsProvider;
