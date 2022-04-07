import React from 'react'
import {useSelector} from 'react-redux'
import Header from "./components/Header";
import "./App.scss";
import "./components/component.scss";
import CertGallery from "./components/CertGallery";
import CertList from "./components/CertList";


function App() {

  const { theme } = useSelector((state) => {return state})
  
  return (
    
    <main className={`app-${theme ? 'dark' : 'light'}`}>
      <Header/>
      {!navigator.onLine && <div className="warn">You are offine please check your internet connection..!!</div> }
      <div className="certwrap">
        <CertGallery />
        <CertList/>
      </div>
    </main>
  );
}

export default App;
