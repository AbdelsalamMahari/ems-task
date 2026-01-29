import React from 'react'
import type { PopupProps } from './Popup.interface'
import './Popup.css'
import { IoClose } from 'react-icons/io5'

const Popup = ({content, onClose}: PopupProps) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div style={{display: 'flex', justifyContent: 'flex-end', cursor: 'pointer'}} onClick={onClose}>
        <IoClose fontSize={'2rem'}/>
      </div>
        {content}
      </div>
    </div>
  )
}

export default Popup