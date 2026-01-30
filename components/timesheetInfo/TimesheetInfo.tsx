import React from 'react'

const TimesheetInfo = ({data}: any) => {
      const { full_name, start_time, end_time, summary} = data
  return (
    <div className="cont-info">
      <div className="info-item">
        <span className="info-label">Start Time</span>
        <span className="info-value">{start_time}</span>
      </div>

      <div className="info-item">
        <span className="info-label">End Time</span>
        <span className="info-value">{end_time || '-'}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Summary</span>
        <span className="info-value">{summary || '-'}</span>
      </div>
    </div>
  )
}

export default TimesheetInfo