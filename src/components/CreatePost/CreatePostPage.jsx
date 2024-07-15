import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import CreatePostHeader from "./createPostHeader";
import ErrorComponent from "../Error/error";
import useCreatePostEditor from "../../api/hooks/useCreatePostEditor";

function CreatePost() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);
  const [thumbNail, setThumbNail] = useState(null);

  const { createPostEditor, loading, success, error } = useCreatePostEditor(
    editorRef,
    thumbNail,
    title,
    category,
    published
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/posts");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  if (success) {
    return <h1>{success}</h1>;
  }

  return (
    <div className=" flex flex-col h-full gap-2">
      {error && <ErrorComponent error={error} />}
      <CreatePostHeader
        setCategory={setCategory}
        category={category}
        title={title}
        setPublished={setPublished}
        setTitle={setTitle}
        published={published}
        setThumbNail={setThumbNail}
      />
      <Editor
        apiKey={import.meta.env.VITE_TinyMCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table code help wordcount",
            "image",
            "paste",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image | help",
          paste_data_images: true,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button
        className="btn max-sm:w-full max-w-36 self-center"
        onClick={createPostEditor}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Blog Post"}
      </button>
    </div>
  );
}

export default CreatePost;
