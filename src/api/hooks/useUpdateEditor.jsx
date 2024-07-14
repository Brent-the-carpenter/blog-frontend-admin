import { useState } from "react";
import { extractImages, dataURItoBlob } from "../../utils/imageHelpers";
import { uploadImage } from "../../services/imageService";
import useCreatePost from "./useCreatePost";

const useUpdateEditor = (editorRef, thumbNail, title, category, published) => {
  const [loading, setLoading] = useState(false);
  const { createPost, success, error } = useCreatePost();

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

  return { updateEditor, loading, success, error };
};

export default useUpdateEditor;
