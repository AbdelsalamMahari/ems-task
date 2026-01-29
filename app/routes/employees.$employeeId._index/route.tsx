import EmployeeForm from "components/employeeForm/EmployeeForm"
import Popup from "elements/popup/Popup"
import { useState } from "react"
import { Form, useLoaderData, useParams, type ActionFunction } from "react-router"
import { getDB } from "~/db/getDB"
import EmployeeInfo from "components/employeeInfo/EmployeeInfo"

export async function loader({params}:any) {
  const { employeeId } = params
  const db = await getDB()
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [employeeId])
  console.log(employee)
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
  const db = await getDB()
  await db.run(
    `UPDATE employees 
     SET full_name = ?, email = ?, phone_number = ?, dob = ?, job_title = ?, department = ?, salary = ?, start_date = ?, end_date = ?
     WHERE id = ?`,
    [full_name, email, phone_number, dob, job_title, department, salary, start_date, end_date, employeeId]
  );

  return null;
}

export default function EmployeePage() {
  const { employee } = useLoaderData()
  console.log("employee data", employee)
  const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false)

  const onUpdateClick = () => {
    setShowUpdatePopup(true)
  }

  return (
    <>
    <div>
      <EmployeeInfo data={employee} onUpdate={onUpdateClick}/>
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets/">Timesheets</a></li>
      </ul>

    </div>
    {showUpdatePopup && (
        <Popup
        content={
          <Form method="post">
            <EmployeeForm data={employee}/>
          </Form>
      }
        onClose={() => setShowUpdatePopup(false)}
        />
    )}
    </>
  )
}
