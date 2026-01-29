import React, { useState } from 'react'
import type { EmployeeFormProps } from './EmployeeForm.interface'

const EmployeeForm = ({data}:EmployeeFormProps) => {
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
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input type="text" name="full_name" id="full_name" required value={employee.full_name} onChange={(e) => setEmployee({...employee, full_name: e.target.value})}/>

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required value={employee.email} onChange={(e) => setEmployee({...employee, email: e.target.value})}/>

          <label htmlFor="phone_number">Phone Number</label>
          <input type="number" name="phone_number" id="phone_number" value={employee.phone_number} onChange={(e) => setEmployee({...employee, phone_number: e.target.value})}/>

          <label htmlFor="dob">Date of Birth</label>
          <input type="date" name="dob" id="dob" value={employee.dob} onChange={(e) => setEmployee({...employee, dob: e.target.value})}/>
        </div>
        <div>
          <label htmlFor="job_title">Job Title</label>
          <input type="text" name="job_title" id="job_title" value={employee.job_title} onChange={(e) => setEmployee({...employee, job_title: e.target.value})}/>

          <label htmlFor="department">Department</label>
          <input type="text" name="department" id="department" value={employee.department} onChange={(e) => setEmployee({...employee, department: e.target.value})}/>

          <label htmlFor="salary">Salary</label>
          <input type="number" name="salary" id="salary" value={employee.salary} onChange={(e) => setEmployee({...employee, salary: e.target.value})}/>

          <label htmlFor="start_date">Start date</label>
          <input type="date" name="start_date" id="start_date" value={employee.start_date} onChange={(e) => setEmployee({...employee, start_date: e.target.value})}/>

          <label htmlFor="end_date">End date</label>
          <input type="date" name="end_date" id="end_date" value={employee.end_date} onChange={(e) => setEmployee({...employee, end_date: e.target.value})}/>
        </div>
        <button type="submit">{data ? "Update Employee" : "Create Employee"}</button>
    </div>
  )
}

export default EmployeeForm