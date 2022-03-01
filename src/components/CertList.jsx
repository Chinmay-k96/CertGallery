import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { certArray } from "./certficateList";
import { setCertImg } from "./stateReducer";

const CertList = () => {

  const { certImg, filteredCerts } = useSelector(state => state)
  const dispatch = useDispatch();

  return (
    <div className="certlist">
      {filteredCerts.map((c, i) => {
        return (
          <div
            key={i}
            className="certificate"
            onClick={() => dispatch(setCertImg(c.path))}
          >
            {c.name}
            <a href={`./certificates/${certImg}`} download={certImg}><i title="Download Certificate" id="download" className="fa-solid fa-download"></i></a>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(CertList);
