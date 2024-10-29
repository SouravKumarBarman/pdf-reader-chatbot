import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { setPdfId } from "../../features/pdfSlice";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadFile(file);

    
    const formData = new FormData();
    formData.append("pdf", file); // Change "file" to "pdf" or whatever the expected field name is
    
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Your PDF file has been successfully stored!");
      console.log(response.data.filename);

      dispatch(setPdfId(response.data.filename));

    } catch (err) {
      console.error(err);
      setError("Failed to upload the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = () => document.getElementById("fileInput").click();

  return (
    <div className="flex flex-wrap justify-between items-center mx-0 w-full shadow-md">
      <div className="text-center">
        <img className="p-4" src="./logo.png" alt="App Logo" width="150" />
      </div>

      <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center">
          <div className="mr-3">
            {loading ? (
              <p className="">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              uploadFile && (
                <p className="flex items-center">
                  <img src="./file_icon.png" alt="PDF Icon" className="mr-2" width="25px" />
                  {uploadFile.name}
                </p>
              )
            )}
          </div>

          <button
            type="button"
            onClick={handleFileUpload}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-black focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              <img src="./upload_btn.png" alt="Upload Icon" width="25px" className="mr-2" />
              <span className="hidden sm:inline">Upload PDF</span>
            </span>
          </button>

          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Header;
