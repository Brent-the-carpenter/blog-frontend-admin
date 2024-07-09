const postURl = import.meta.env.VITE_POSTS_URI;
async function GETPosts(signal) {
  try {
    const response = await fetch(postURl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: signal,
    });
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.status = response.status;
      error.message = await response.text();
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in GETPosts ");
    throw error;
  }
}

export default GETPosts;
