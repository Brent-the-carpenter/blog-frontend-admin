import { useEffect, useState } from "react";
import GETPosts from "../fetch/GETPosts";

const useGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchPosts = async () => {
      try {
        const posts = await GETPosts(signal);
        if (posts) {
          setPosts(posts);
          setError(null);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("error in hook ", error.message);
          setError({ message: error.message, status: error.status });
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      console.log("abort controller fired for cleanup");
      abortController.abort();
    };
  }, []);

  return { error, loading, posts };
};

export default useGetPosts;
