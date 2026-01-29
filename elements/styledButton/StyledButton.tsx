import React from 'react'
import './StyledButton.css'

const StyledButton = ({title, onClick, type}:any) => {
  return (
    <button className="styled-button" onClick={onClick} type={type}>
    <span className="styled-button-text">{title}</span>
    </button>
  )
}

export default StyledButton