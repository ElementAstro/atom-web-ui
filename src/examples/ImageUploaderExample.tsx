import React from "react";
import ImageUploader from "../components/ImageUploader";

const ImageUploaderExample: React.FC = () => {
  const handleUpload = (file: File) => {
    console.log("Uploaded file:", file);
  };

  const handleImageLoad = () => {
    console.log("Image loaded");
  };

  const handleImageError = () => {
    console.log("Image failed to load");
  };

  return (
    <div className="p-4">
      <ImageUploader
        onUpload={handleUpload}
        onImageLoad={handleImageLoad}
        onImageError={handleImageError}
        multiple={true}
        maxFileSize={5 * 1024 * 1024} // 5MB
        preview={true}
        theme="light"
        tooltip="Click to upload images"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        iconColor="text-gray-400"
        autoClose={false}
        autoCloseDuration={5000}
        ariaLabel="示例图片上传器"
      />
    </div>
  );
};

export default ImageUploaderExample;