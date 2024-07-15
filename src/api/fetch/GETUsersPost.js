const baseUrl = import.meta.env.VITE_BASE_URL;

async function GetUsersPost(token, limit, signal) {
  const UserPostsUrl = `${baseUrl}/users/posts${limit ? `?limit=${limit}` : ""}`;

  try {
    const result = await fetch(UserPostsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    const resultContentType = result.headers.get("content-type");
    let data;
    if (resultContentType && resultContentType.includes("application/json")) {
      data = await result.json();
    } else {
      data = await result.text();
    }
    if (!result.ok) {
      const error = new Error("Error fetching users post");
      error.status = result.status;
      error.message = data.message || result.statusText;
      throw error;
    }
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error("Fetch error:", error);
    }
    throw error; // Ensure the error is thrown
  }
}

export default GetUsersPost;
