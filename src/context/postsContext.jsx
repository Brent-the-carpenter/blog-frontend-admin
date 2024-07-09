import { createContext, useMemo } from "react";
import propTypes from "prop-types";
import useGetPosts from "../api/hooks/useGetPosts";
import { DateTime } from "luxon";

export const PostsContext = createContext({
  posts: [],
  loading: true,
  error: null,
});

const PostsProvider = ({ children }) => {
  const { posts, loading, error } = useGetPosts();
  console.log(error);

  const formattedPosts = useMemo(() => {
    return Array.isArray(posts)
      ? posts.map((post) => ({
          ...post,
          createdAt: DateTime.fromISO(post.createdAt).toFormat("MM/dd/yyyy"),
        }))
      : [];
  }, [posts]);

  const value = useMemo(
    () => ({
      posts: formattedPosts,
      loading,
      error,
    }),
    [error, loading, formattedPosts]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
};

export default PostsProvider;
