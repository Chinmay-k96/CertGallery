import React from 'react'
import {certArray} from './certficateList'

const CertList = ({setCertImg}) => {
  return (
    <div className="certlist">
      {
        certArray.map((c,i)=>{
          return <div key={i} className="certificate" onClick={()=> setCertImg(c.path)}>{c.name}</div>
        })
      }
    </div>
  )
}

export default React.memo(CertList)