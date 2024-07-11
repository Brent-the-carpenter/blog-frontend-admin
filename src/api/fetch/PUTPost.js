const baseURL = import.meta.env.VITE_API_URL;

const PUTPost = async (id, update) => {
  const updatePostURL = `${baseURL}/posts/${id}`;
  const response = await fetch(updatePostURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
