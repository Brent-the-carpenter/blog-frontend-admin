const logout = async (userToken) => {
  const response = await fetch(import.meta.env.VITE_BASE_URL + "/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });
  const parsedResponse = await response.json();
  if (!response.ok) {
    const error = new Error("Logout failed");
    error.status = response.status;
    error.message = parsedResponse.message;
    throw error;
  }

  return parsedResponse;
};
export default logout;
