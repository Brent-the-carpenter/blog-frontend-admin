import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useCreatePost from "../../api/hooks/useCreatePost";
import CreatePostHeader from "./createPostHeader";
import ErrorComponent from "../Error/error";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);
  const [thumbNail, setThumbNail] = useState(null);
  const [loading, setLoading] = useState(false);

  const { success, error, createPost } = useCreatePost();
  const navigate = useNavigate();
  const extractImages = (htmlContent) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    const imgs = div.querySelectorAll("img");
    return Array.from(imgs).map((img) => ({ src: img.src, element: img }));
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const uploadImage = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Image upload response does not contain a secure URL");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const updateEditor = async () => {
    setLoading(true);
    let content = editorRef.current.getContent();
    const images = extractImages(content);

    for (const image of images) {
      if (image.src.startsWith("data:")) {
        try {
          const blob = dataURItoBlob(image.src);
          const imageUrl = await uploadImage(blob);
          content = content.replace(image.src, imageUrl);
        } catch (error) {
          console.error("Failed to process image:", error);
        }
      }
    }

    let thumbNailURL = null;
    if (thumbNail) {
      try {
        thumbNailURL = await uploadImage(thumbNail);
      } catch (error) {
        console.error("Failed to upload thumbnail:", error);
      }
    }

    const BlogPost = {
      content,
      category,
      title,
      published,
    };
    if (thumbNailURL) {
      BlogPost.thumbNail = thumbNailURL;
    }

    try {
      await createPost(BlogPost);
    } catch (e) {
      console.error("Error creating post:", e);
    } finally {
      setLoading(false);
    }
  };
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
    <div className="h-full">
      {error && <ErrorComponent error={error} />}
      <CreatePostHeader
        setCategory={setCategory}
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
      <button className="btn" onClick={updateEditor} disabled={loading}>
        {loading ? "Submitting..." : "Submit Blog Post"}
      </button>
    </div>
  );
}

export default CreatePost;
