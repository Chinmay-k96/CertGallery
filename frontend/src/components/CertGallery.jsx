import React, {useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { THEME_DARK, THEME_LIGHT } from '../shared/constants';

const CertGallery = () => {

  const [load, setLoad] = useState(false);

  const { certImg, theme } = useSelector(state => state)
  //console.log(certImg)

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
    setLoad(false);
    }, 0.5);

  }, [certImg]);

  if (load) return <></>;

  return (
    <section className='cert-gallery flex justify-center items-center' data-theme={`${theme ? THEME_LIGHT : THEME_DARK}`}>
      <img src={`/certificates/${certImg}`} alt={`${certImg}`} className='img-cert shadow-[0_0_20px_0_rgba(24,54,100,.65)]'></img>
    </section>
  )
}

export default React.memo(CertGallery)