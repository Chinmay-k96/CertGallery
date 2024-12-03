import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import "./App.scss";
import CertGallery from "./components/CertGallery";
import CertList from "./components/CertList";
import { setFilteredCerts, setCertObject } from "./shared/stateReducer";
import axios from "axios";
import { THEME_DARK, THEME_LIGHT } from "./shared/constants";
import Loader from "./shared/Loader";
import { ToastContainer } from "react-toastify";

function App() {
  const [reloading, setReloading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { theme } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    try {
      if(reloading){
        (async () => {
          const certificates = await axios.get("/api/certificates", {
            withCredentials: true,
          });
          setIsLoggedIn(certificates?.data?.isLoggedIn);
          const certArray = certificates?.data?.data;
          dispatch(setFilteredCerts(certArray));
          dispatch(setCertObject(certArray[0]));
          setLoading(false);
          setReloading(false);
        })();
      }
    } catch (error) {
      console.error("Unable to load certificates - ", error);
    }
  }, [reloading]);

  return (
    <main data-theme={`${theme ? THEME_DARK : THEME_LIGHT}`}>
      <Header
        setReloading={setReloading}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      {!navigator.onLine && (
        <div className="warn">
          You are offine please check your internet connection..!!
        </div>
      )}
      <div className="certwrap">
        <Loader loading={loading} />
        <CertGallery loading={loading} />
        <CertList isLoggedIn={isLoggedIn} setReloading={setReloading} />
      </div>
      <ToastContainer
        hideProgressBar={true}
        autoClose={3000}
        toastClassName={`data-theme-${THEME_DARK}`}
      />
    </main>
  );
}

export default App;
