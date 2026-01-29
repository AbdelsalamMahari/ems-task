import { Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  return { employees };
}

import type { ActionFunction } from "react-router";
import TimesheetForm from "components/timesheetForm/TimesheetForm";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id"); // <select /> input with name="employee_id"
  const summary = formData.get("summary");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  const db = await getDB();
  await db.run(
    'INSERT INTO timesheets (employee_id, start_time, end_time, summary) VALUES (?, ?, ?, ?)',
    [employee_id, start_time, end_time, summary]
  );

  return redirect("/timesheets");
}

export default function NewTimesheetPage() {

  return (
    <div>
      <h1>Create New Timesheet</h1>
      <Form method="post">
        <TimesheetForm/>
      </Form>
      <hr />
      <ul>
        <li><a href="/timesheets">Timesheets</a></li>
        <li><a href="/employees">Employees</a></li>
      </ul>
    </div>
  );
}
