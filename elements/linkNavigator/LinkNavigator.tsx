import React from 'react'
import { Link } from 'react-router'

const LinkNavigator = ({icon, title, link, onClick}:any) => {
  return (
    <Link to={link}>
    <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}} onClick={onClick}>
    <>{icon}</>
    <h1 style={{fontSize: '1rem'}}>{title}</h1>
    </div>
    </Link>
  )
}

export default LinkNavigator