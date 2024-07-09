import PropTypes from "prop-types";

function CreatePostHeader({ setTitle, setCategory, setPublished, published }) {
  return (
    <div className="flex justify-center gap-4">
      <div className="formControl">
        <label htmlFor="title">Blog Post Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Please select a category</option>
          <option value="coding">Coding</option>
          <option value="carpentry">Carpentry</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="published">Publish:</label>
        <input
          type="checkbox"
          name="published"
          id="published"
          checked={published}
          onChange={() => setPublished(!published)}
        />
      </div>
    </div>
  );
}

CreatePostHeader.propTypes = {
  setTitle: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  setPublished: PropTypes.func.isRequired,
  published: PropTypes.bool.isRequired,
};

export default CreatePostHeader;
