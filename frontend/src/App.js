import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import "./App.scss";
import CertGallery from "./components/CertGallery";
import CertList from "./components/CertList";
import { setFilteredCerts, setCertObject } from "./shared/stateReducer";
import axios from "axios";
import { THEME_DARK } from "./shared/constants";
import Loader from "./shared/Loader";
import { ToastContainer } from "react-toastify";

function App() {
  const [reloading, setReloading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const token = sessionStorage.getItem('usertoken')

  axios.interceptors.request.use(
    (config) => {
      // Set the baseURL dynamically or statically
      if (process.env.REACT_APP_NODE_ENV !== "development") {
        config.baseURL = process.env.REACT_APP_BASE_URL;
        if(token){
          config.headers['Authorization'] = `Bearer ${token}`
        }
      }else{
        config.baseURL = "http://localhost:5000";
      }
      return config; // Always return the config object
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  useLayoutEffect(() => {
    try {
      if (reloading) {
        (async () => {
          const certificates = await axios.get("/api/certificates", {
            withCredentials: true,
          });
          setIsLoggedIn(certificates?.data?.isLoggedIn);
          const certArray = certificates?.data?.data;
          if (Array.isArray(certArray)) {
            dispatch(setFilteredCerts(certArray));
            dispatch(setCertObject(certArray[0]));
          }
          setLoading(false);
          setReloading(false);
        })();
      }
    } catch (error) {
      console.error("Unable to load certificates - ", error);
      setLoading(false);
    }
  }, [reloading, dispatch]);

  return (
    <main data-theme={THEME_DARK}>
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
        autoClose={2000}
        toastClassName={`data-theme-${THEME_DARK}`}
      />
    </main>
  );
}

export default App;
