import React from 'react'
import type { StyledInputProps } from './StyledInput.interface'
import './StyledInput.css'

const StyledInput = ({label, placeholder, value, onChange, isTextArea = false, type = "text", name}:StyledInputProps) => {
  return (
    <div className="input-container">
      <label className="input-label-container">
        {label && <p className="input-label">{label}</p>}

        {isTextArea ? (
          <textarea
            className="input-textarea"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
          />
        ) : (
          <input
            className="input-field"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </label>
    </div>
  )
}

export default StyledInput