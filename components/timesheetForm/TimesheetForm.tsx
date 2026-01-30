import StyledButton from 'elements/styledButton/StyledButton';
import StyledDropDown from 'elements/styledDropDown/StyledDropDown'
import StyledInput from 'elements/styledInput/StyledInput'
import React, { useState } from 'react'
import { useLoaderData } from 'react-router';

const TimesheetForm = ({data, setSelectedUserId}:any) => {
  const { employees } = useLoaderData(); // Used to create a select input
  const [employeeId, setEmployeeId] = useState("")

  const transformedOptions = employees && employees.map((employee:any) => ({
    label: employee.full_name,
    value: employee.id
  }))

  const handleOptionChange = (e:any) => {
    setEmployeeId(e.target.value)
    setSelectedUserId(e.target.value)
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
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      {!data && (
          <StyledDropDown placeholder='Select Employee' label='Select Employee' name="employee_id" value={employeeId} onChange={handleOptionChange} options={transformedOptions}/>
        )}
          <StyledInput label='Start Time' type="datetime-local" name="start_time" id="start_time" required value={timesheet.start_time} onChange={(e) => setTimeSheet({...timesheet, start_time: e.target.value})}/>
        
          <StyledInput label='End Time' type="datetime-local" name="end_time" id="end_time" required value={timesheet.end_time} onChange={(e) => setTimeSheet({...timesheet, end_time: e.target.value})}/>
        
          <StyledInput label='Summary' name="summary" id="summary" isTextArea value={timesheet.summary} onChange={(e) => setTimeSheet({...timesheet, summary: e.target.value})}/>
    </div>
    <div style={{display: 'flex', marginTop: '2rem'}}>
        <StyledButton type="submit" title={data ? "Update Timesheet" : "Create Timesheet"}/>
    </div>
    </div>
  )
}

export default TimesheetForm