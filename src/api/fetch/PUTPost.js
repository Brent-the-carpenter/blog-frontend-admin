const baseURL = import.meta.env.VITE_POSTS_URI;

const PUTPost = async (id, update, token) => {
  const updatePostURL = `${baseURL}/${id}`;
  const response = await fetch(updatePostURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(update),
  });
  const responseContentType = response.headers.get("content-type");
  let data;
  if (responseContentType && responseContentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  if (!response.ok) {
    const error = new Error("Failed to update post");
    error.status = response.status;
    error.message = data.error.message;
    throw error;
  }

  return data;
};

export default PUTPost;
