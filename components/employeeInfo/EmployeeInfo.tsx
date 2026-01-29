import type { EmployeeInfoProps } from './EmployeeInfo.interface'
import './EmployeeInfo.css'

const EmployeeInfo = ({data}: EmployeeInfoProps) => {
  const { email, phone_number, dob, job_title, department, salary, start_date, end_date} = data

  return (
 <div className="employee-info">
      <div className="info-item">
        <span className="label">Email</span>
        <span className="value">{email}</span>
      </div>

      <div className="info-item">
        <span className="label">Phone Number</span>
        <span className="value">{phone_number || '-'}</span>
      </div>

      <div className="info-item">
        <span className="label">Date of Birth</span>
        <span className="value">{dob || '-'}</span>
      </div>

      <div className="info-item">
        <span className="label">Job Title</span>
        <span className="value">{job_title || '-'}</span>
      </div>

      <div className="info-item">
        <span className="label">Department</span>
        <span className="value">{department || '-'}</span>
      </div>

      <div className="info-item">
        <span className="label">Salary</span>
        <span className="value">{salary || '-'}</span>
      </div>

      <div className="info-item">
        <span className="label">Start Date</span>
        <span className="value">{start_date || '-'}</span>
      </div>

      <div className="info-item">
        <span className="label">End Date</span>
        <span className="value">{end_date ? end_date : 'Still working'}</span>
      </div>
    </div>
  )
}

export default EmployeeInfo