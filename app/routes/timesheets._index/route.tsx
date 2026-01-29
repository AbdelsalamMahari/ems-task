import { Link, useLoaderData } from "react-router";
import { getDB } from "~/db/getDB";
import Calendar from "components/calendar/Calendar";
import { useState } from "react";
import './TimesheetPage.css'
import SearchBar from "elements/searchBar/SearchBar";
import { formatDateTime } from "utils/FormatDateTime";

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

  const handleChangeView = () => {
    setIsCalendarView(!isCalendarView)
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
    <div>
      <div>
        <button onClick={handleChangeView}>{isCalendarView ? 'Table View' : 'Calendar View'}</button>
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
          {filteredItems.map((timesheet:any) => (
            <tr key={timesheet.id}>
              <td>
                <Link to={`${timesheet.id}`}>#{timesheet.id}</Link>
              </td>
              <td>{timesheet.full_name} (ID: {timesheet.employee_id})</td>
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
      <hr />
      <ul>
        <li><a href="/timesheets/new">New Timesheet</a></li>
        <li><a href="/employees">Employees</a></li>
      </ul>
    </div>
  );
}
