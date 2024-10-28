import { useState } from "react";
import axios from "axios";

const Header = () => {
  // All States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  // handler method to take file and upload it
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setUploadFile(file);

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setLoading(false);
      setError(false);
      alert("Your PDF file has been successfully stored!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  // handler for open file uploader clicking on upload button
  const handleFileUpload = () => document.getElementById("fileInput").click();

  return (
    <div className="flex flex-row">
      <div className="text-center ">
        <img className="p-4 " src="./logo.png" alt="App Logo" width="150" />
      </div>

      <div className="ml-auto items-center">
        <div className="flex justify-end">
          {loading ? (
            <p>Loading.....</p>
          ) : error ? (
            <p>Something went wrong.</p>
          ) : (
            uploadFile && (
              <p>
                {/* Name and logo of uploaded file */}
                <img src="./file_icon.png" alt="PDF Icon" />
                {uploadFile.name}
              </p>
            )
          )}

          {/* Upload button */}
          <button className="upload-btn" onClick={handleFileUpload}>
            Upload PDF
          </button>
          <button className="small" onClick={handleFileUpload}>
            <img alt="Upload Button" />
          </button>
        </div>
        <div>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
