import propTypes from "prop-types";
function ErrorComponent({ error }) {
  return (
    <div>
      {<h1 className="error text-red-800">{error.message}</h1>}
      {error.messages.map((message, index) => (
        <h2 key={index} className="error text-red-800">
          {message.msg}
        </h2>
      ))}
      <h1 className="error text-red-800">Status: {error.status}</h1>
    </div>
  );
}
ErrorComponent.propTypes = {
  error: propTypes.object.isRequired,
};
export default ErrorComponent;
