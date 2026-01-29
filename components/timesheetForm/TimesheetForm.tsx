import StyledDropDown from 'elements/styledDropDown/StyledDropDown'
import StyledInput from 'elements/styledInput/StyledInput'
import React, { useState } from 'react'
import { useLoaderData } from 'react-router';

const TimesheetForm = ({data}:any) => {
  const { employees } = useLoaderData(); // Used to create a select input
  const [employeeId, setEmployeeId] = useState("")

  const handleOptionChange = (e:any) => {
    setEmployeeId(e.target.value)
    console.log(e.target.value)
  }

    const [timesheet, setTimeSheet] = useState({
    start_time: data?.start_time || '',
    end_time: data?.end_time || '',
    summary: data?.summary || '',
  });

  return (
    <div>
      {/* if !data so its update mode */}
      {!data && (
        <div>
          <StyledDropDown name="employee_id" value={employeeId} onChange={handleOptionChange} options={employees}/>
        </div>
        )}
        <div>
          <label htmlFor="start_time">Start Time</label>
          <input type="datetime-local" name="start_time" id="start_time" required value={timesheet.start_time} onChange={(e) => setTimeSheet({...timesheet, start_time: e.target.value})}/>
        </div>
        <div>
          <label htmlFor="end_time">End Time</label>
          <input type="datetime-local" name="end_time" id="end_time" required value={timesheet.end_time} onChange={(e) => setTimeSheet({...timesheet, end_time: e.target.value})}/>
        </div>
        <div>
          <StyledInput name="summary" isTextArea value={timesheet.summary} onChange={(e) => setTimeSheet({...timesheet, summary: e.target.value})}/>
        </div>
        <button type="submit">{data ? "Update Timesheet" : "Create Timesheet"}</button>
    </div>
  )
}

export default TimesheetForm