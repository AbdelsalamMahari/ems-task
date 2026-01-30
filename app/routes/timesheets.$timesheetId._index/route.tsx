import TimesheetForm from "components/timesheetForm/TimesheetForm"
import TimesheetInfo from "components/timesheetInfo/TimesheetInfo"
import HeaderNavigator from "elements/headerNavigator/HeaderNavigator"
import LinkNavigator from "elements/linkNavigator/LinkNavigator"
import Popup from "elements/popup/Popup"
import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { TbClockPlus } from "react-icons/tb"
import { Form, redirect, useLoaderData, type ActionFunction } from "react-router"
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
  await db.run( `UPDATE timesheets SET start_time = ?, end_time = ?, summary = ? WHERE id = ?`,
    [start_time, end_time, summary, timesheetId]
  );

  return redirect('/timesheets');
}

export default function TimesheetPage() {
  const { timesheet } = useLoaderData()
  const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false)
  
  const onUpdateClick = () => {
    setShowUpdatePopup(true)
  }

  return (
    <div className="parent-cont">
            <div className="nav-head">
        <HeaderNavigator title={timesheet.full_name} />
        <div className="nav-head-icons">
          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer'}} onClick={onUpdateClick}>
            <>{<FaRegEdit />}</>
            <h1 style={{fontSize: '1rem'}}>{'Edit TimeSheet'}</h1>
            </div>
          <LinkNavigator icon={<TbClockPlus fontSize={'1.25rem'}/>} title={'Add New Timesheet'} link={'/timesheet/new'}/>
          <LinkNavigator icon={<FiUsers fontSize={'1.25rem'}/>} title={'Employees'} link={'/employees'}/>
        </div>
      </div>
        <TimesheetInfo data={timesheet} onUpdate={onUpdateClick}/>

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
