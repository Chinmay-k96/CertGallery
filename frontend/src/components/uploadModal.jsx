import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UploadModal = ({ show, setShow, handleSubmit }) => {
  function closeModal() {
    setShow(false);
  }

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form action={handleSubmit}>
            <label for="certificateName">Certificate Name</label>
            <input
              type="text"
              className="filename"
              name="certificateName"
              placeholder="Enter the certificate name"
              required
            />
            <label for="certImage">Certificate Name</label>
            <input
              type="file"
              className="imageUpload"
              name="certImage"
              accept="image/*"
            />
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UploadModal;
