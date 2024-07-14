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
export { uploadImage };
