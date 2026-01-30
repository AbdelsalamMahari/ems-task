import { Link, useLoaderData } from "react-router";
import { getDB } from "~/db/getDB";
import Calendar from "components/calendar/Calendar";
import { useState } from "react";
import './TimesheetPage.css'
import SearchBar from "elements/searchBar/SearchBar";
import { formatDateTime } from "utils/FormatDateTime";
import HeaderNavigator from "elements/headerNavigator/HeaderNavigator";
import LinkNavigator from "elements/linkNavigator/LinkNavigator";
import { FiUsers } from "react-icons/fi";
import { TbClockPlus } from "react-icons/tb";

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );

  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData();
  const [isCalendarView, setIsCalendarView] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(timesheetsAndEmployees);

  const handleChangeView = (view:string) => {
    view === 'calendarView' ? setIsCalendarView(true) : setIsCalendarView(false)
  }

      const handleSearch = (e:any) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = timesheetsAndEmployees.filter(
      (timesheet:any) =>
        timesheet.full_name.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="parent-cont">
      <div className="nav-head">
      <HeaderNavigator title={'TimeSheets'} description={'Track, create, and manage employee work hours'} />
        <div className="nav-head-icons">
          <LinkNavigator icon={<TbClockPlus  fontSize={'1.25rem'}/>} title={'Add New Timesheet'} link={'/timesheets/new'}/>
          <LinkNavigator icon={<FiUsers fontSize={'1.25rem'}/>} title={'Employees'} link={'/employees'}/>
          </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem'}}>
        <button className="styled-button-toggle" onClick={() => handleChangeView('tableView')} style={{backgroundColor: isCalendarView ? '' : '#1E3A8A', color: isCalendarView ? '' : '#fff'}}>{'Table View'}</button>
        <button className="styled-button-toggle" onClick={() => handleChangeView('calendarView')} style={{backgroundColor: isCalendarView ? '#1E3A8A' : '', color: isCalendarView ? '#fff' : ''}}>{'Calendar View'}</button>
      </div>
      {/* Replace `true` by a variable that is changed when the view buttons are clicked */}
      {!isCalendarView ? (
        
    <div className="timesheets-table-container">
      <SearchBar value={searchQuery} onChange={handleSearch}/>
      <table className="timesheets-table">
        <thead>
          <tr>
            <th>Timesheet ID</th>
            <th>Employee</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (<h1>No results found</h1>) : 
          filteredItems.map((timesheet:any) => (
            <tr key={timesheet.id}>
              <td> #{timesheet.id} </td>
              <td><Link to={`${timesheet.id}`}>{timesheet.full_name} (ID: {timesheet.employee_id})</Link></td>
              <td>{formatDateTime(timesheet.start_time)}</td>
              <td>{formatDateTime(timesheet.end_time)}</td>
              <td>{timesheet.summary || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      ) : (
        <div>
          <Calendar allEvents={timesheetsAndEmployees}/>
        </div>
      )}
    </div>
  );
}
