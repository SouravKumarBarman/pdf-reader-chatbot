import { useState} from "react";
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
  const handleFileUpload = () => document.getElementById("fileInput").click()

  return (
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <div className="text-center ">
        <img className="p-4 " src="./logo.png" alt="App Logo" width="150" />
      </div>

      <div className="flex items-center">
        <div className="">
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
        </div>
        <div onClick={handleFileUpload}>
          {/* Upload button */}
          <button  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-black dark:text-black focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              <img
                src="./upload_btn.png"
                alt=""
                width="25px"
                className="mr-0 sm:mr-3"
              />
              <span className="hidden sm:inline">Upload PDF</span>
            </span>
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
