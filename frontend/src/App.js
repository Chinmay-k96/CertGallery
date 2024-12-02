import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import "./App.scss";
import CertGallery from "./components/CertGallery";
import CertList from "./components/CertList";
import { setFilteredCerts } from "./shared/stateReducer";
import axios from "axios";
import { THEME_DARK, THEME_LIGHT } from "./shared/constants";

function App() {
  const [reloading, setReloading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    try {
      (async () => {
        const certificates = await axios.get("/api/certificates", {
          withCredentials: true,
        });
        setIsLoggedIn(certificates?.data?.isLoggedIn);
        // dispatch(setFilteredCerts(certificates?.data))
      })();
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
        <CertGallery />
        <CertList />
      </div>
    </main>
  );
}

export default App;
