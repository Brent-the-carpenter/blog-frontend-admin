import PropTypes from "prop-types";

function CreatePostHeader({
  setTitle,
  setCategory,
  setPublished,
  published,
  setThumbnail,
}) {
  return (
    <div className=" flex  justify-start gap-4  flex-wrap max-md:flex-col mb-2">
      <div className="createPostHeader ">
        <label htmlFor="title">Blog Post Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="createPostHeader w-6">
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
      <div className="createPostHeader  items-center">
        <label htmlFor="thumb_nail">Thumb nail</label>
        <input
          type="file"
          name="thumb_nail"
          id="thumb_nail"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
      </div>
      <div className="createPostHeader ">
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
  setThumbnail: PropTypes.func.isRequired,
};

export default CreatePostHeader;
