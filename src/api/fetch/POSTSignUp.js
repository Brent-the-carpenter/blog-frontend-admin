const baseUrl = import.meta.env.VITE_BASE_URL;
const signUpUrl = `${baseUrl}/auth/signup`;
async function signUp(data, signal) {
  const response = await fetch(signUpUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    signal,
  });
  const responseData = await response.json();
  if (!response.ok) {
    const error = new Error("An error occurred while signing up");
    error.status = response.status;
    error.errors = responseData.errors;
    throw error;
  }
  return responseData;
}
export default signUp;
