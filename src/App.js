import React, {useState} from 'react'
import Header from "./components/Header";
import "./App.scss";
import "./components/component.scss";
import CertGallery from "./components/CertGallery";
import CertList from "./components/CertList";
import reactCert from './certificates/React-Basic-Hackerrank.JPG'


function App() {
  
  const [theme, setTheme] = useState(true)
  const [certImg, setCertImg] = useState(reactCert)

  return (
    
    <div className={`app-${theme ? 'dark' : 'light'}`}>
      <Header setTheme={setTheme}/>
      <div className="certwrap">
        <CertGallery certImg={certImg}/>
        <CertList setCertImg={setCertImg}/>
      </div>
    </div>
  );
}

export default App;
