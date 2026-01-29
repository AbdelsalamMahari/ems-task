import React from 'react'
import type { StyledDropDownProps } from './StyledDropDown.interface'
import './StyledDropDown.css'

const StyledDropDown = ({ label, placeholder, options, value, onChange, name }:StyledDropDownProps) => {
  return (
        <div className="dropdown-container">
      {label && <p className="dropdown-label">{label}</p>}

      <select
        className={`dropdown-select ${value ? "has-value" : ""}`}
        value={value}
        onChange={onChange}
        name={name}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.full_name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StyledDropDown