import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SearchBox from "./SearchBox";
import UploadModal from "./uploadModal";
import LoginModal from "./loginModal";
import axios from "axios";
import { THEME_ALTERNATE } from "../shared/constants";

const Header = ({ setReloading, isLoggedIn, setIsLoggedIn }) => {
  const [themeToggle, setThemeToggle] = useState(true);
  const [showLogginModal, setShowLogginModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (pin) => {
    try {
      await axios.post(
        "/api/user/login",
        { mpin: pin }
      );
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Unable to login - ", error);
      setIsLoggedIn(false);
    }
  };

  const handleUpload = async ({ name, content }) => {
    try {
      await axios.post(
        "/api/upload",
        { filename: name, content: content },
        { withCredentials: true }
      );
      setReloading(true);
    } catch (error) {
      console.error("Unable to login - ", error);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 header flex justify-between">
        <div className="heading  w-full">Welcome to Cert Gallery</div>
        <div className="flex justify-end pl-4 mr-3 right-nav">
          <SearchBox />
          <div className="dropdown dropdown-end w-[4.5rem] h-[4.5rem] mr-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar w-full h-full "
            >
              <div className="w-full h-full rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-1 shadow"
              data-theme={THEME_ALTERNATE}
            >
              <li
                className={`text-[1.4rem] p-6 hover:bg-base-100 cursor-pointer ${
                  isLoggedIn ? "" : "disabled"
                }`}
                title="Login to add certificate"
                onClick={() => setShowUploadModal(true)}
              >
                Add Certificate
              </li>
              <li
                className="text-[1.4rem] p-6 hover:bg-base-100 cursor-pointer"
                onClick={() => {
                  if(isLoggedIn){

                  }else{

                    setShowLogginModal(true)
                  }
                }}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <UploadModal
        show={showUploadModal}
        setShow={setShowUploadModal}
        handleSubmit={handleUpload}
      />
      <LoginModal
        show={showLogginModal}
        setShow={setShowLogginModal}
        handleLogin={handleLogin}
      />
    </>
  );
};

export default React.memo(Header);
