interface EmployeeInfoData {
  full_name: string
  email: string
  phone_number:number
  dob: string
  job_title: string
  department: string
  salary: string
  start_date: string
  end_date: string
}

export interface EmployeeInfoProps {
data: EmployeeInfoData
}