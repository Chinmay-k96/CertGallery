import React from 'react'
import reactCert from '../certificates/React-Basic-Hackerrank.JPG'


const CertGallery = ({certImg}) => {
  return (
    <div className='cert-gallery'>
      <img src={certImg} alt="ceritificate"></img>
    </div>
  )
}

export default React.memo(CertGallery)