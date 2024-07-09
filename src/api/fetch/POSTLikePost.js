const postURL = import.meta.env.VITE_POSTS_URI;
const likePOST = async (postID, token) => {
  const response = await fetch(postURL + "/" + postID + "/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
  });
  const contentType = response.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    console.log("response status");
    const error = new Error(response.statusText);
    error.status = response.status;
    error.message = data.error?.message || data || "Error in like post";
    throw error;
  }

  return data;
};

export default likePOST;
