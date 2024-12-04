import React from "react";
import './Loader.scss'

const Loader = ({loading}) => {
  return (
    <div className={`overlay ${loading ? 'block' : 'hidden'}`}>
      <div className="overlay__inner">
        <div className="overlay__content">
          <span className="spinner"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
