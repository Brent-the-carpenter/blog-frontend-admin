import { useState, useCallback } from "react";
import { extractImages, dataURItoBlob } from "../../utils/imageHelpers";
import { uploadImage } from "../../services/imageService";
import PUTPost from "../fetch/PUTPost";
import useUserContext from "../../context/userContext/useUserContext";
import usePostContext from "../../context/postsContext/usePostsContext";

function useUpdatePostEditor(
  postId,
  editorRef,
  thumbNail,
  title,
  category,
  published
) {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useUserContext();
  const { updatePost } = usePostContext();

  const updatePostEditor = useCallback(async () => {
    setLoading(true);
    let content = editorRef.current.getContent();
    const images = extractImages(content);

    for (const image of images) {
      if (image.src.startsWith("data:")) {
        try {
          const blob = dataURItoBlob(image.src);
          const imageUrl = await uploadImage(blob);
          content = content.replace(image.src, imageUrl);
        } catch (err) {
          console.error("Failed to process image:", err);
        }
      }
    }

    let thumbNailURL = null;
    if (thumbNail) {
      try {
        thumbNailURL = await uploadImage(thumbNail);
      } catch (err) {
        console.error("Failed to upload thumbnail:", err);
      }
    }

    const updatedBlogPost = {
      content,
      category,
      title,
      published,
    };

    if (thumbNailURL) {
      updatedBlogPost.thumbNail = thumbNailURL;
    }

    try {
      const response = await PUTPost(postId, updatedBlogPost, token);
      if (response) {
        setSuccess("Post updated successfully");

        updatePost(response);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, [
    postId,
    token,
    editorRef,
    thumbNail,
    title,
    category,
    published,
    updatePost,
  ]);

  return { updatePostEditor, success, error, loading };
}

export default useUpdatePostEditor;
