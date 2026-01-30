import EmployeeForm from "components/employeeForm/EmployeeForm"
import Popup from "elements/popup/Popup"
import { useState } from "react"
import { Form, redirect, useActionData, useLoaderData, useParams, type ActionFunction } from "react-router"
import { getDB } from "~/db/getDB"
import EmployeeInfo from "components/employeeInfo/EmployeeInfo"
import HeaderNavigator from "elements/headerNavigator/HeaderNavigator"
import LinkNavigator from "elements/linkNavigator/LinkNavigator"
import { RiUserAddLine } from "react-icons/ri"
import { FiClock } from "react-icons/fi"
import { FaRegEdit } from "react-icons/fa"
import { getAge } from "utils/GetAge"

export async function loader({params}:any) {
  const { employeeId } = params
  const db = await getDB()
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [employeeId])
  return {employee}
}

export const action: ActionFunction = async ({ request, params }) => {
  const { employeeId } = params;
  const formData = await request.formData();

  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone_number = formData.get("phone_number");
  const dob = formData.get("dob");
  const job_title = formData.get("job_title");
  const department = formData.get("department");
  const salary = formData.get("salary");
  const start_date = formData.get("start_date");
  const end_date = formData.get("end_date");

    if(!full_name || !email || !phone_number || !start_date) {
      return {message: 'Please fill out all required fields.'}
    }
  
    if(getAge(dob) < 18) {
      return {message: 'Employee must be at least 18 years old.'}
    }

  const db = await getDB()
  await db.run(
    `UPDATE employees 
     SET full_name = ?, email = ?, phone_number = ?, dob = ?, job_title = ?, department = ?, salary = ?, start_date = ?, end_date = ?
     WHERE id = ?`,
    [full_name, email, phone_number, dob, job_title, department, salary, start_date, end_date, employeeId]
  );

  return redirect('/employees');
}

export default function EmployeePage() {
  const { employee } = useLoaderData()
  const msg = useActionData();
  const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false)

  const onUpdateClick = () => {
    setShowUpdatePopup(true)
  }

  return (
    <>
    <div style={{padding: '3rem'}}>
      <div className="nav-head">
        <HeaderNavigator title={employee.full_name} />
        <div className="nav-head-icons">
          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer'}} onClick={onUpdateClick}>
            <>{<FaRegEdit />}</>
            <h1 style={{fontSize: '1rem'}}>{'Edit Employee'}</h1>
            </div>
          <LinkNavigator icon={<RiUserAddLine fontSize={'1.25rem'}/>} title={'Add New Employee'} link={'/employees/new'}/>
          <LinkNavigator icon={<FiClock fontSize={'1.25rem'}/>} title={'Timesheets'} link={'/timesheets'}/>
        </div>
      </div>
      <EmployeeInfo data={employee}/>
    </div>
    {showUpdatePopup && (
        <Popup
        content={
          <Form method="post">
            <EmployeeForm data={employee} msg={msg}/>
          </Form>
      }
        onClose={() => setShowUpdatePopup(false)}
        />
    )}
    </>
  )
}
