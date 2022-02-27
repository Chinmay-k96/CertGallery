import React, { useState } from "react";

const Header = ({ setTheme }) => {
  const [themeToggle, setThemeToggle] = useState(true);

  return (
      <div className="header">
        <div className="heading">Welcome to Cert Gallery</div>
        <div className="searchbox">
          <input type="text" placeholder="Search..." />
          <i className="fas fa-thin fa-magnifying-glass"></i>
        </div>
        <div title="Theme">
          <label class="switch">
            <input
              type="checkbox"
              title="Theme"
              checked={themeToggle}
              onChange={() => {
                setThemeToggle((prev) => !prev);
                setTheme((prev) => !prev);
              }}
            />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
  );
};

export default React.memo(Header);
