const baseUrl = import.meta.env.VITE_API_BASE_URL;
const tokenUrl = `${baseUrl}/auth/token`;

const checkToken = async (token) => {
  try {
    const response = await fetch(tokenUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check for HTTP error statuses
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("user");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseContentType = response.headers.get("content-type");
    let data;
    if (
      responseContentType &&
      responseContentType.includes("application/json")
    ) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    return { status: response.status, data };
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow the error after logging it
  }
};

export default checkToken;
