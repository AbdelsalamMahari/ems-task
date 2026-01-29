import React from 'react'
import type { SearchBarProps } from './SearchBar.interface'
import { FiSearch } from 'react-icons/fi'
import './SearchBar.css'

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
      </div>
  )
}

export default SearchBar