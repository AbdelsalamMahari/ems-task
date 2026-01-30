import type { EmployeeInfoProps } from './EmployeeInfo.interface'

const EmployeeInfo = ({data}: EmployeeInfoProps) => {
  const { email, phone_number, dob, job_title, department, salary, start_date, end_date} = data

  return (
 <div className="cont-info">
      <div className="info-item">
        <span className="info-label">Email</span>
        <span className="info-value">{email}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Phone Number</span>
        <span className="info-value">{phone_number || '-'}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Date of Birth</span>
        <span className="info-value">{dob || '-'}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Job Title</span>
        <span className="info-value">{job_title || '-'}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Department</span>
        <span className="info-value">{department || '-'}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Salary</span>
        <span className="info-value">{salary || '-'}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Start Date</span>
        <span className="info-value">{start_date || '-'}</span>
      </div>

      <div className="info-item">
        <span className="info-label">End Date</span>
        <span className="info-value">{end_date ? end_date : 'Still working'}</span>
      </div>
    </div>
  )
}

export default EmployeeInfo