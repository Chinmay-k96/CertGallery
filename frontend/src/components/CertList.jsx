import React, { Fragment, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCertObject } from "../shared/stateReducer";
import DeleteModal from "./Modals/deleteModal";
import axios from "axios";
import { toast } from "react-toastify";

const CertList = ({ isLoggedIn, setReloading }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const certRef = useRef();

  const { certObject, filteredCerts } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/certificates/${certRef.current?._id}`, {
        withCredentials: true,
      });
      setShowDeleteModal(false);
      setReloading(true);
      toast("Certificate Deleted Successfully");
    } catch (error) {
      console.error("Unable to delete - ", error);
      toast.error("Unable to delete certificate");
      setShowDeleteModal(false);
    }
  };

  return (
    <section className="certlist">
      {filteredCerts.map((c, i) => {
        return (
          <Fragment>
            <div key={i} className="divider m-0"></div>
            <div
              key={c?.filename}
              className={`certificate hover:bg-base-200 ${
                certObject?.filename === c?.filename ? "bg-base-200" : ""
              }`}
            >
              <span
                className="cursor-pointer"
                onClick={() => dispatch(setCertObject(c))}
              >
                {c.filename}
              </span>
              <div className="flex items-center justify-between">
                {isLoggedIn && (
                  <>
                    <i
                      title="Edit Certificate"
                      id="editCert"
                      className="fa-solid fa-pencil mr-8 cursor-pointer"
                    ></i>
                    <i
                      title="Delete Certificate"
                      id="download"
                      className="fa-solid fa-trash mr-8 cursor-pointer"
                      onClick={() => {
                        certRef.current = c;
                        setShowDeleteModal(true);
                      }}
                    ></i>
                  </>
                )}
                <i
                  title="Download Certificate"
                  id="download"
                  className="fa-solid fa-download cursor-pointer"
                ></i>
              </div>
            </div>
          </Fragment>
        );
      })}
      <DeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        handleDelete={handleDelete}
        fileName={certRef.current?.filename}
      />
    </section>
  );
};

export default React.memo(CertList);
