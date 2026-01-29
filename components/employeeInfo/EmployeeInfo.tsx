import React, { useState } from 'react'
import type { EmployeeInfoProps } from './EmployeeInfo.interface'
import Popup from 'elements/popup/Popup'

const EmployeeInfo = ({data, onUpdate}: EmployeeInfoProps) => {
  const { full_name, email, phone_number, dob, job_title, department, salary, start_date, end_date} = data

  return (
    <div>
        <div>Fullname: {full_name}</div>
        <div>Email: {email}</div>
        <div>Phone Number: {phone_number}</div>
        <div>Date of Birth: {dob || "-"}</div>
        <div>Job Title: {job_title || "-"}</div>
        <div>department: {department || "-"}</div>
        <div>Salary: {salary || "-"}</div>
        <div>Start date: {start_date || "-"}</div>
        <div>End date: {!end_date ? 'Still working' : end_date}</div>

        <button onClick={onUpdate}>Update</button>

    </div>
  )
}

export default EmployeeInfo