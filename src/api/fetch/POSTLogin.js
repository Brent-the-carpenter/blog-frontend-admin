const LoginURL = import.meta.env.VITE_BASE_URL + "/auth/login";
const Login = async (data, signal) => {
  const response = await fetch(LoginURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    signal,
  });
  const parsedResponse = await response.json();
  if (!response.ok) {
    const error = new Error("Sign in failed");
    error.status = response.status;
    error.message = parsedResponse.error.message;
    throw error;
  }

  return parsedResponse;
};
export default Login;
