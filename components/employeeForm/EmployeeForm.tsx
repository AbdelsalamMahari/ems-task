import React, { useState } from 'react'
import type { EmployeeFormProps } from './EmployeeForm.interface'
import StyledInput from 'elements/styledInput/StyledInput';
import StyledButton from 'elements/styledButton/StyledButton';
import './EmployeeForm.css'

const EmployeeForm = ({data, msg}:EmployeeFormProps) => {
  const [employee, setEmployee] = useState({
  full_name: data?.full_name || '',
  email: data?.email || '',
  phone_number: data?.phone_number || '',
  dob: data?.dob || '',
  job_title: data?.job_title || '',
  department: data?.department || '',
  salary: data?.salary || '',
  start_date: data?.start_date || '',
  end_date: data?.end_date || ''
});
  return (
    <div>
        <div className="form-grid">
          <StyledInput msg={msg} placeholder='Enter Full Name' label='Full Name' type="text" name="full_name" id="full_name" value={employee.full_name} onChange={(e) => setEmployee({...employee, full_name: e.target.value})}/>

          <StyledInput msg={msg} placeholder='Enter Email' label='Email' type="email" name="email" id="email" value={employee.email} onChange={(e) => setEmployee({...employee, email: e.target.value})}/>

          <StyledInput msg={msg} placeholder='Enter Phone Number' label='Phone Number' type="number" name="phone_number" id="phone_number" value={employee.phone_number} onChange={(e) => setEmployee({...employee, phone_number: e.target.value})}/>

          <StyledInput msg={msg} label='Date of Birth' type="date" name="dob" id="dob" value={employee.dob} onChange={(e) => setEmployee({...employee, dob: e.target.value})}/>

          <StyledInput placeholder='Enter Job Title' label='Job Title' type="text" name="job_title" id="job_title" value={employee.job_title} onChange={(e) => setEmployee({...employee, job_title: e.target.value})}/>

          <StyledInput placeholder='Enter Department' label='Department' type="text" name="department" id="department" value={employee.department} onChange={(e) => setEmployee({...employee, department: e.target.value})}/>

          <StyledInput placeholder='Enter Salary' label='Salary' type="number" name="salary" id="salary" value={employee.salary} onChange={(e) => setEmployee({...employee, salary: e.target.value})}/>

          <StyledInput msg={msg} label='Start date' type="date" name="start_date" id="start_date" value={employee.start_date} onChange={(e) => setEmployee({...employee, start_date: e.target.value})}/>

          <StyledInput label='End date' type="date" name="end_date" id="end_date" value={employee.end_date} onChange={(e) => setEmployee({...employee, end_date: e.target.value})}/>
        </div>

        <p style={{color: 'red', marginTop: '1rem'}}>
          {msg && msg.message}
        </p>

        <div className='action-btn'>
          <StyledButton type="submit" title={data ? "Update Employee" : "Create Employee"}/>
        </div>
    </div>
  )
}

export default EmployeeForm