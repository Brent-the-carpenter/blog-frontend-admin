import GETPost from "../fetch/GETPost";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
const useGetPost = (postId) => {
  console.log("Post id in hook ", postId);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchPost = async () => {
      try {
        const post = await GETPost(postId, signal);
        if (post) {
          post.createdAt = DateTime.fromISO(post.createdAt).toFormat(
            "MM/dd/yyyy"
          );
          post.comments.map((comment) => {
            comment.time_stamp = DateTime.fromISO(comment.time_stamp).toFormat(
              "MM/dd/yyyy"
            );
          });
          setPost(post);
          setError(null);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.status);
          console.log("error fetching post: ");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();

    return () => {
      console.log("Abort Controller fired to clean up");
      abortController.abort();
    };
  }, [postId]);
  return { post, error, loading };
};

export default useGetPost;
