import React, { useState } from "react";
import SearchBox from "./SearchBox";
import UploadModal from "./Modals/uploadModal";
import LoginModal from "./Modals/loginModal";
import axios from "axios";
import { THEME_ALTERNATE } from "../shared/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const Header = ({ setReloading, isLoggedIn, setIsLoggedIn }) => {
  const [showLogginModal, setShowLogginModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleLogin = async (pin) => {
    try {
      await axios.post("/api/user/login", { mpin: pin });
      setIsLoggedIn(true);
      setShowLogginModal(false);
      toast.success("Login Successfull");
    } catch (error) {
      console.error("Unable to login - ", error);
      setIsLoggedIn(false);
      toast.error("Unable to login");
    }
  };

  const handleUpload = async (name, content) => {
    try {
      await axios.post(
        "/api/upload",
        { filename: name, content: content },
        { withCredentials: true }
      );
      setReloading(true);
      setShowUploadModal(false);
      toast.success("Upload Successfull");
    } catch (error) {
      console.error("Unable to Upload - ", error);
      toast.error("Unable to upload certificate");
    }
  };

  const onLoginOut = () => {
    if (isLoggedIn) {
      deleteCookie("usertoken");
      setIsLoggedIn(false);
      toast.success("You have been logged out successfully");
    } else {
      setShowLogginModal(true);
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
                  src="data:image/jpeg;base64,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"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-60 p-1 shadow"
              data-theme={THEME_ALTERNATE}
            >
              <li
                className={`px-2 py-4 hover:bg-base-100 cursor-pointer ${
                  isLoggedIn ? "" : "disabled"
                }`}
                title="Login to add certificate"
                onClick={() => setShowUploadModal(true)}
              >
                <div className="flex justify-between items-center text-[1.4rem]">
                  <i class="fa-solid fa-upload"></i>Add Certificate
                </div>
              </li>
              <li
                className="px-2 py-4 hover:bg-base-100 cursor-pointer"
                onClick={onLoginOut}
              >
                <div className="flex justify-between items-center text-[1.4rem]">
                  <i class="fa-solid fa-right-from-bracket"></i>
                  {isLoggedIn ? "Logout" : "Login"}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showUploadModal && <UploadModal
        show={showUploadModal}
        setShow={setShowUploadModal}
        handleSubmit={handleUpload}
      />}
      <LoginModal
        show={showLogginModal}
        setShow={setShowLogginModal}
        handleLogin={handleLogin}
      />
    </>
  );
};

export default React.memo(Header);
