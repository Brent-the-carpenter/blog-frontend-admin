const baseUrl = import.meta.env.VITE_BASE_URL;

const POST_Comment = async (postId, token, comment) => {
  const postCommentUrl = baseUrl + `/posts/${postId}/comments`;

  const response = await fetch(postCommentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
    mode: "cors",
  });
  const responseContentType = response.headers.get("content-type");
  let data;
  if (responseContentType && responseContentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.status = response.status;
    error.message = data.error?.message || data || "Error in post comment";
    throw error;
  }
  return data;
};

export default POST_Comment;
