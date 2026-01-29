import React from 'react'
import { Link } from 'react-router'
import './EmployeeCard.css'

const EmployeeCard = ({data}:EmployeeCardProps) => {
  const { id, full_name, email, phone_number, job_title} = data
  return (
    <Link to={`${id}`} style={{textDecoration: 'none', color: 'inherit'}}>
     <div className="employee-card">
      <div className="employee-card__header">
        <h2>{full_name}</h2>
      </div>

      <div className="employee-card__body">
        <div className="row">
          <span>Email</span>
          <span>{email}</span>
        </div>

        <div className="row">
          <span>Phone</span>
          <span>{phone_number}</span>
        </div>

        <div className="row">
          <span>Job Title</span>
          <span>{job_title}</span>
        </div>

      </div>
    </div>
    </Link>
  )
}

export default EmployeeCard