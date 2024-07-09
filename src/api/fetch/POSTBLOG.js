const baseUrl = import.meta.env.VITE_BASE_URL;
const postURL = `${baseUrl}/posts`;
const POST_Blog = async (blogData, token) => {
  const response = await fetch(postURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });
  const responseContentType = response.headers.get("content-type");
  let data;
  if (responseContentType && responseContentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  if (!response.ok) {
    const error = new Error("Problem posting blog");
    error.status = response.status;
    error.message = data.error.message;
    throw error;
  }
  return data;
};
export default POST_Blog;
