import { useState } from "react";

export const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState({});
  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const fileUploadHandler = () => {
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);

    // Details of the uploaded file
    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object
    fetch("api/uploadfile", {
      body: formData,
      method: "post",
    });
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile?.name}</p>

          <p>File Type: {selectedFile?.type}</p>

          <p>Last Modified: {selectedFile?.lastModifiedDate?.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <>
      <div>
        <h2>File Upload using React</h2>
        <div>
          <input type="file" onChange={fileChangeHandler} />
          <button onClick={fileUploadHandler}>Upload!</button>
        </div>
        {fileData()}
      </div>
    </>
  );
};
