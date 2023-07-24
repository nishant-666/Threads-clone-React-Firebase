import React, { useState } from "react";
import Compressor from "compressorjs";

const Upload = () => {
  const [compressedFile, setCompressedFile] = useState(null);

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.8,
      success: (compressedResult) => {
        setCompressedFile(compressedResult);
      },
    });
  };

  return (
    <input
      accept="image/*,capture=camera"
      capture="”camera"
      type="file"
      onChange={handleCompressedUpload}
    />
  );
};

export default Upload;
