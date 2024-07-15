import PropTypes from "prop-types";

const ErrorComponent = ({ error }) => {
  const errorMessages = error?.messages ?? [];

  return (
    <div className="error-component">
      <h1 className="text-red-800">{error.message || "An error occurred"}</h1>
      {errorMessages.length > 0 && (
        <div>
          {errorMessages.map((message, index) => (
            <h2 key={index} className="text-red-800">
              {message.msg || message}
            </h2>
          ))}
        </div>
      )}
      {error.status && <h1 className="text-red-800">Status: {error.status}</h1>}
    </div>
  );
};

ErrorComponent.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        msg: PropTypes.string,
      })
    ),
    status: PropTypes.number,
  }),
};

export default ErrorComponent;
