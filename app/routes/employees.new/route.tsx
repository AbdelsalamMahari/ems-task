import EmployeeForm from "components/employeeForm/EmployeeForm";
import NewEmployee from "components/employeeForm/EmployeeForm";
import HeaderNavigator from "elements/headerNavigator/HeaderNavigator";
import LinkNavigator from "elements/linkNavigator/LinkNavigator";
import { FiClock } from "react-icons/fi";
import { Form, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ request }) => {
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

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name, email, phone_number, dob, job_title, department, salary, start_date, end_date) VALUES (?,?,?,?,?,?,?,?,?)',
    [full_name, email, phone_number, dob, job_title, department, salary, start_date, end_date]
  );

  return redirect("/employees");
}

export default function NewEmployeePage() {
  return (
    <div style={{padding: '3rem'}}>
      <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <HeaderNavigator title={'Create New Employee'} />
      <LinkNavigator icon={<FiClock fontSize={'1.25rem'}/>} title={'Timesheets'} link={'/timesheets'}/>
      </div>

      <Form method="post">
        <EmployeeForm/>
      </Form>
    </div>
  );
}
