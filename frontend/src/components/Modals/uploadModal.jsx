import React, { useRef, useState, useEffect } from "react";
import CustomModal from "../../shared/CustomModal";

const UploadModal = ({ show, setShow, handleSubmit, editRef }) => {
  const [fileName, setFileName] = useState("");
  const fileRef = useRef();

  let content = "";

  useEffect(() => {
    if (editRef) {
      setFileName(editRef?.filename);
    }else{
      setFileName("")
    }
  }, [editRef]);

  function closeModal() {
    setShow(false);
  }

  const handleNameChange = (e) => {
    let name = e.target.value;
    setFileName(name);
  };

  function convertImageToBase64(file) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read the file as a Data URL (Base64 encoded)
      reader.onload = function (e) {
        fileRef.current = e.target.result;
        if (editRef) {
          content = e.target.result;
        }
        console.log("Base64 String:", e.target.result); // Log the Base64 string
      };

      reader.onerror = function (e) {
        console.error("Error reading file:", e.target.error);
      };
    } else {
      console.error("No file selected");
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    convertImageToBase64(file);
  };

  const modalBody = () => (
    <>
      <div className="mb-6 text-[1.3rem]">Enter Certificate Name</div>
      <label className="input input-bordered flex items-center gap-2 h-[3.5rem]">
        <input
          type="text"
          value={fileName}
          className="grow text-xl/8 text-[1.5rem]"
          onChange={handleNameChange}
          placeholder="Enter certificate name"
          required
        />
      </label>
      <div className="mb-6 mt-12 text-[1.3rem]">Select Certificate</div>
      <label className="input input-bordered flex items-center p-0 cursor-pointer h-[3.5rem]">
        <input
          type="file"
          className="file-input file-input-bordered w-full h-[3.4rem]"
          accept="image/*"
          required={editRef ? false : true}
          onChange={handleFileSelect}
        />
      </label>
    </>
  );

  const modalFooter = () => (
    <>
      <button type="submit" className="btn btn-primary text-[1.3rem] mt-6">
        Upload
      </button>
    </>
  );

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editRef) {
      let obj = {};
      obj.filename = fileName;
      if (content) {
        obj.content = content;
      }
      handleSubmit(obj);
    } else {
      handleSubmit(fileName, fileRef.current);
    }
  };

  return (
    <CustomModal
      modalTitle={"Upload Certificate"}
      modalBody={modalBody}
      modalFooter={modalFooter}
      show={show}
      closeModal={closeModal}
      handleSubmit={handleFormSubmit}
      width={"60rem"}
    />
  );
};

export default UploadModal;
