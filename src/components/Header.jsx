import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SearchBox from "./SearchBox";
import { setTheme } from "./stateReducer";

const Header = () => {
  const [themeToggle, setThemeToggle] = useState(true);
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="heading">Welcome to Cert Gallery</div>
      <div className="head-right">
        <SearchBox/>
        <div title="Theme">
        <label className="switch">
          <input
            type="checkbox"
            title="Theme"
            checked={themeToggle}
            onChange={() => {
              setThemeToggle((prev) => !prev);
              dispatch(setTheme());
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
