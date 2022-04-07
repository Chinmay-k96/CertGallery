import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCertImg } from "./stateReducer";

const CertList = () => {
  const { certImg, filteredCerts } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <section className="certlist">
      {filteredCerts.map((c, i) => {
        return (
          <div
            key={i}
            className="certificate"
            onClick={() => dispatch(setCertImg(c.path))}
          >
            <img
              className="cert-icon"
              src={c.icon}
              alt="icon"
              width="20"
              height="20"
            ></img>
            {c.name}
            <a href={`certificates/${certImg}`} download={certImg} className="download-icon">
              <i
                title="Download Certificate"
                id="download"
                className="fa-solid fa-download"
              ></i>
            </a>
          </div>
        );
      })}
    </section>
  );
};

export default React.memo(CertList);
