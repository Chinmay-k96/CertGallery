import React, {useState, useEffect } from 'react'
import {useSelector} from 'react-redux'

const CertGallery = () => {

  const [load, setLoad] = useState(false);

  const { certImg } = useSelector(state => state)
  console.log(certImg)

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
    setLoad(false);
    }, 0.5);

  }, [certImg]);

  if (load) return <></>;

  return (
    <div className='cert-gallery'>
      <img src={`./certificates/${certImg}`} alt="ceritificate" className='img-cert'></img>
    </div>
  )
}

export default React.memo(CertGallery)