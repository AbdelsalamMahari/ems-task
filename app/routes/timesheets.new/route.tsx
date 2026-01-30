import { Form, redirect, useLoaderData } from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  return { employees };
}

import type { ActionFunction } from "react-router";
import TimesheetForm from "components/timesheetForm/TimesheetForm";
import HeaderNavigator from "elements/headerNavigator/HeaderNavigator";
import LinkNavigator from "elements/linkNavigator/LinkNavigator";
import { FiClock, FiUser, FiUsers } from "react-icons/fi";
import { useState } from "react";

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
  const [selectedUserId, setSelectedUserId] = useState('')

  return (
    <div className="parent-cont">
      <div className="nav-head">
      <HeaderNavigator title={'Create New Timesheet'} />
      <div className="nav-head-icons">
        {selectedUserId && (
        <LinkNavigator icon={<FiUser fontSize={'1.25rem'}/>} title={'Employee Page'} link={`/employees/${selectedUserId}`}/>
        )}
        <LinkNavigator icon={<FiUsers fontSize={'1.25rem'}/>} title={'Employees'} link={'/employees'}/>
      </div>
      </div>
      <Form method="post">
        <TimesheetForm setSelectedUserId={setSelectedUserId}/>
      </Form>
    </div>
  );
}
