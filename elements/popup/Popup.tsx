import React from 'react'
import type { PopupProps } from './Popup.interface'
import './Popup.css'

const Popup = ({content, onClose}: PopupProps) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {content}
        <button className="popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Popup