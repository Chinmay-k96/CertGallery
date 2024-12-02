import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCertImg } from "../shared/stateReducer";

const CertList = () => {
  const { certImg, filteredCerts } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <section className="certlist">
      {filteredCerts.map((c, i) => {
        return (
          <Fragment>
            <div key={i} className="divider m-0"></div>
            <div
              key={c?.path}
              className={`certificate hover:bg-base-200 ${certImg === c?.path ? "bg-base-200" : ""}`}
              onClick={() => {
                dispatch(setCertImg(c.path));
              }}
            >
              <img
                className="cert-icon"
                src={c.icon}
                alt="icon"
                width="20"
                height="20"
              ></img>
              {c.name}
              <a
                href={`certificates/${certImg}`}
                download={certImg}
                className="download-icon"
              >
                <i
                  title="Download Certificate"
                  id="download"
                  className="fa-solid fa-download"
                ></i>
              </a>
            </div>
          </Fragment>
        );
      })}
    </section>
  );
};

export default React.memo(CertList);
