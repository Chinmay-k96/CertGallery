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
    
    <div className={`app-${theme ? 'dark' : 'light'}`}>
      <Header/>
      <div className="certwrap">
        <CertGallery />
        <CertList/>
      </div>
    </div>
  );
}

export default App;
