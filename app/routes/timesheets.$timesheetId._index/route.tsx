import TimesheetForm from "components/timesheetForm/TimesheetForm"
import TimesheetInfo from "components/timesheetInfo/TimesheetInfo"
import Popup from "elements/popup/Popup"
import { useState } from "react"
import { Form, useLoaderData, type ActionFunction } from "react-router"
import { getDB } from "~/db/getDB"

export async function loader({params}:any) {
  const { timesheetId } = params
  const db = await getDB()
  const timesheet = await db.get("SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id WHERE timesheets.id = ?", [timesheetId])
  console.log(timesheet)
  return {timesheet}
}

export const action: ActionFunction = async ({ request, params }) => {
  const { timesheetId } = params;
  const formData = await request.formData();

  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const summary = formData.get("summary");
  const db = await getDB()
  await db.run(
    `UPDATE timesheets 
     SET start_time = ?, end_time = ?, summary = ?
     WHERE id = ?`,
    [start_time, end_time, summary, timesheetId]
  );

  return null;
}

export default function TimesheetPage() {
  const { timesheet } = useLoaderData()
  const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false)
  
  const onUpdateClick = () => {
    setShowUpdatePopup(true)
  }

  return (
    <div>
      <div>
        <TimesheetInfo data={timesheet} onUpdate={onUpdateClick}/>
      </div>
      <ul>
        <li><a href="/timesheets">Timesheets</a></li>
        <li><a href="/timesheets/new">New Timesheet</a></li>
        <li><a href="/employees/">Employees</a></li>
      </ul>

          {showUpdatePopup && (
        <Popup
        content={
          <Form method="post">
            <TimesheetForm data={timesheet}/>
          </Form>
      }
        onClose={() => setShowUpdatePopup(false)}
        />
    )}
    </div>
  )
}
