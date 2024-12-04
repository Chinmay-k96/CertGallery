import React, {useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { THEME_ALTERNATE } from '../shared/constants';

const CertGallery = ({loading}) => {

  const [load, setLoad] = useState(false);

  const { certObject } = useSelector(state => state)

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
    setLoad(false);
    }, 0.5);

  }, [certObject]);

  if (load) return <></>;

  return (
    <section className='cert-gallery flex justify-center items-center' data-theme={THEME_ALTERNATE}>
      {!loading && certObject && <img src={certObject?.content} alt={`${certObject?.filename}`} className='img-cert shadow-[0_0_20px_0_rgba(24,54,100,.65)]'></img>}
    </section>
  )
}

export default React.memo(CertGallery)