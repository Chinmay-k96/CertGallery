import { useRef } from "react";
import CustomModal from "../../shared/CustomModal";

const LoginModal = ({ show, setShow, handleLogin }) => {
  const pinRef = useRef();

  const closeModal = () => {
    setShow(false);
  };

  const handlePinChange = (e) => {
    let pin = e.target.value;
    pinRef.current = pin;
  };

  const modalBody = () => (
    <>
      <div className="mb-6 text-[1.3rem]">Enter your MPIN</div>
      <label className="input input-bordered flex items-center gap-2 h-[4rem]">
        <input
          type="text"
          className="grow text-xl/8 text-[1.5rem]"
          onChange={handlePinChange}
          placeholder="Enter MPIN"
          required
        />
      </label>
    </>
  );

  const modalFooter = () => (
    <>
      <button
        type="submit"
        className="btn btn-primary text-[1.3rem] mt-6"
        //onClick={() => handleLogin(pinRef.current)}
      >
        Login
      </button>
    </>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(pinRef.current);
  };

  return (
    <CustomModal
      modalTitle={"Login"}
      modalBody={modalBody}
      modalFooter={modalFooter}
      show={show}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      width={"45rem"}
    />
  );
};

export default LoginModal;
