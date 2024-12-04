import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { THEME_DARK } from "./constants";

const CustomModal = ({
  modalTitle,
  modalBody,
  modalFooter,
  closeModal,
  show,
  width,
  handleSubmit
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [show]);

  if (!show) return null; // Don't render the modal if not open

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50`}
    >
      <div
        className={`w-[${width}] rounded-2xl shadow-lg p-8 relative ${
          isVisible ? "fade-in" : "fade-out"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        data-theme={THEME_DARK}
      >
        <div className="flex justify-between">
          <div className="font-bold text-[2rem]">{modalTitle}</div>
          <button
            className="btn btn-sm btn-circle btn-ghost text-[1.3rem]"
            onClick={() => {
              setIsVisible(false);
              setTimeout(closeModal, 400);
            }}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-8">{modalBody()}</div>
          <div className="modal-action">{modalFooter()}</div>
        </form>
      </div>
    </div>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default CustomModal;
