import React, { useRef } from "react";
import CustomModal from "../shared/CustomModal";

const UploadModal = ({ show, setShow, handleSubmit }) => {
  const nameRef = useRef();
  const fileRef = useRef();

  function closeModal() {
    setShow(false);
  }

  const handleNameChange = (e) => {
    let name = e.target.value;
    nameRef.current = name;
  };

  function convertImageToBase64(file) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read the file as a Data URL (Base64 encoded)
      reader.onload = function (e) {
        fileRef.current = e.target.result;
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
      <label className="input input-bordered flex items-center gap-2 h-[4rem]">
        <input
          type="text"
          className="grow text-xl/8 text-[1.5rem]"
          onChange={handleNameChange}
          placeholder="Enter MPIN"
          required
        />
      </label>
      <div className="mb-6 mt-12 text-[1.3rem]">Select Certificate</div>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        accept="image/*"
        onChange={handleFileSelect}
      />
    </>
  );

  const modalFooter = () => (
    <>
      <button
        className="btn btn-primary text-[1.3rem] mt-6"
        onClick={() => handleSubmit(nameRef.current, fileRef.current)}
      >
        Upload
      </button>
    </>
  );

  return (
    <CustomModal
      modalTitle={"Upload Certificate"}
      modalBody={modalBody}
      modalFooter={modalFooter}
      show={show}
      closeModal={closeModal}
      width={'60rem'}
    />
  );
};

export default UploadModal;
