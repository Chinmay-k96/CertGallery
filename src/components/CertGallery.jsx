import React, {useState, useEffect } from 'react'
import {useSelector} from 'react-redux'

const CertGallery = () => {

  const [load, setLoad] = useState(false);

  const { certImg } = useSelector(state => state)
  //console.log(certImg)

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
    setLoad(false);
    }, 0.5);

  }, [certImg]);

  if (load) return <></>;

  return (
    <section className='cert-gallery'>
      <img src={`certificates/${certImg}`} alt={`${certImg}`} className='img-cert'></img>
    </section>
  )
}

export default React.memo(CertGallery)