import React from 'react'

const TimesheetInfo = ({data, onUpdate}: any) => {
      const { full_name, start_time, end_time, summary} = data
  return (
    <div>
        <div>Fullname: {full_name}</div>
        <div>Start Time: {start_time}</div>
        <div>End Time: {end_time}</div>
        <div>Summary: {summary || "-"}</div>

        <button onClick={onUpdate}>Update</button>

    </div>
  )
}

export default TimesheetInfo