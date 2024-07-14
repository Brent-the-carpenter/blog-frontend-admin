const BaseURL = import.meta.env.VITE_BASE_URL;

const DELETEPost = async (postId, token) => {
  const deletePostUrl = `${BaseURL}/posts/${postId}`;
  const response = await fetch(deletePostUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const responseContentType = response.headers.get("content-type");
  let data;
  if (responseContentType && responseContentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the post");
    error.status = response.status;
    error.message = data?.error?.message || data || "Unknown error";
    throw error;
  }

  return data;
};

export default DELETEPost;
