const GETPost = async (postId, signal) => {
  console.log(postId);
  const postURl = import.meta.env.VITE_POSTS_URI;
  const fetchUrl = postURl + "/" + postId;
  const response = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    signal: signal,
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.status = response.status;
    error.msg = data.msg;
    throw error;
  }

  return data;
};
export default GETPost;
