import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRef } from "react";

const LoginModal = ({ show, setShow, handleLogin }) => {
  const pinRef = useRef();

  const closeModal = () => {
    setShow(false);
  };

  const handlePinChange = (e) => {
    let pin = e.target.value;
    pinRef.current = pin;
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label for="mpin">Enter your MPIN</label>
          <input
            type="text"
            className="mpin"
            name="mpin"
            onChange={handlePinChange}
            placeholder="Enter MPIN"
            required
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>handleLogin(pinRef)}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginModal;
