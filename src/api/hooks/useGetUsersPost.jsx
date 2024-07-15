import { useEffect, useState, useCallback } from "react";
import useUserContext from "../../context/userContext/useUserContext";
import getUsersPost from "../fetch/GETUsersPost";
import { DateTime } from "luxon";

function useGetUsersPost(limit = 5) {
  const [usersPost, setUsersPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useUserContext();

  const fetchUsersPost = useCallback(
    async (signal) => {
      try {
        const posts = await getUsersPost(token, limit, signal);
        const formattedPosts = posts.map((post) => ({
          ...post,
          createdAt: DateTime.fromISO(post.createdAt).toLocaleString(
            DateTime.DATE_SHORT
          ),
        }));
        setUsersPost(formattedPosts);
        setError(null);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [token, limit]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchUsersPost(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [fetchUsersPost]);

  return { usersPost, loading, error };
}

export default useGetUsersPost;
