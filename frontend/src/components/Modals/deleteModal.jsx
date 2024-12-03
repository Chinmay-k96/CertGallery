import CustomModal from "../../shared/CustomModal";

const DeleteModal = ({ show, setShow, handleDelete, fileName }) => {

  const closeModal = () => {
    setShow(false);
  };

  const modalBody = () => <div className="mb-6 text-[1.3rem]">{`Are you sure you want to delete ${fileName} ?`}</div>;

  const modalFooter = () => (
    <>
      <button
        type="submit"
        className="btn btn-error text-[1.3rem] mt-6"
      >
        Delete
      </button>
    </>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    handleDelete();
  };

  return (
    <CustomModal
      modalTitle={"Confirmation"}
      modalBody={modalBody}
      modalFooter={modalFooter}
      show={show}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      width={"45rem"}
    />
  );
};

export default DeleteModal;
