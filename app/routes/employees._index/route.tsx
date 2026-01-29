import EmployeeCard from "components/employeeCard/EmployeeCard"
import { Link, useLoaderData } from "react-router"
import { getDB } from "~/db/getDB"
import './EmployeesPage.css'
import SearchBar from "elements/searchBar/SearchBar"
import { useState } from "react"

export async function loader() {
  const db = await getDB()
  const employees = await db.all("SELECT * FROM employees;")

  return { employees }
}

export default function EmployeesPage() {
  const { employees } = useLoaderData()
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState(employees);

    const handleSearch = (e:any) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = employees.filter(
      (employee:any) =>
        employee.full_name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.phone_number.includes(query)
    );
    setFilteredItems(filtered);
  };
  return (
    <div>
      <SearchBar value={searchQuery} onChange={handleSearch}/>
      <div className="employee-card-cont">
        {filteredItems.map((employee: any) => (
          <EmployeeCard data={employee}/>
        ))}
      </div>
      <hr />
      <ul>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets/">Timesheets</a></li>
      </ul>
    </div>
  )
}
