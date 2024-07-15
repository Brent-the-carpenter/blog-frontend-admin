import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import useGetPost from "../../api/hooks/useGetPost";
import useUpdatePostEditor from "../../api/hooks/useUpdatePostEditor";
import CreatePostHeader from "../CreatePost/createPostHeader";
import { Editor } from "@tinymce/tinymce-react";
import ErrorComponent from "../Error/error";
import { useNavigate } from "react-router-dom";

function UpdatePostPage() {
  const { postId } = useParams();
  const { post, loading: postLoading, error: postError } = useGetPost(postId);
  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);
  const [thumbNail, setThumbNail] = useState(null);
  const navigate = useNavigate();

  const { updatePostEditor, success, error, loading } = useUpdatePostEditor(
    postId,
    editorRef,
    thumbNail,
    title,
    category,
    published
  );

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setPublished(post.published);
      setThumbNail(post.thumbNail);
      if (editorRef.current) {
        editorRef.current.setContent(post.content);
      }
    }
  }, [post]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/posts");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  if (success) {
    return <div>{success}</div>;
  }

  if (postLoading || loading) {
    return <div>Loading...</div>;
  }

  if (postError) {
    return <ErrorComponent error={postError} />;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-col h-full gap-2">
      <h1>Update Post</h1>
      {error && <ErrorComponent error={error} />}
      <CreatePostHeader
        setCategory={setCategory}
        category={category}
        setPublished={setPublished}
        setTitle={setTitle}
        title={title}
        published={published}
        setThumbNail={setThumbNail}
      />
      <Editor
        apiKey={import.meta.env.VITE_TinyMCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={post.content || ""}
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
        onClick={updatePostEditor}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Blog Post"}
      </button>
    </div>
  );
}

export default UpdatePostPage;
