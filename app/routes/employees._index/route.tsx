import EmployeeCard from "components/employeeCard/EmployeeCard"
import { Link, useLoaderData } from "react-router"
import { getDB } from "~/db/getDB"
import './EmployeesPage.css'
import SearchBar from "elements/searchBar/SearchBar"
import { useState } from "react"
import HeaderNavigator from "elements/headerNavigator/HeaderNavigator"
import LinkNavigator from "elements/linkNavigator/LinkNavigator"
import { RiUserAddLine } from "react-icons/ri"
import { FiClock } from "react-icons/fi"

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
    <div className="emp-cont">
      <HeaderNavigator title={'Employees'} description={'Manage employee, view details, and update employee information'} />

      <div>
        <div className="nav-head">
        <SearchBar value={searchQuery} onChange={handleSearch}/>
        <div className="nav-head-icons">
          <LinkNavigator icon={<RiUserAddLine fontSize={'1.25rem'}/>} title={'Add New Employee'} link={'/employees/new'}/>
          <LinkNavigator icon={<FiClock fontSize={'1.25rem'}/>} title={'Timesheets'} link={'/timesheets'}/>
          </div>
        </div>

        <div className="employee-card-cont">
          {filteredItems.length === 0 ? (<h1>No results found</h1>) : 
          filteredItems.map((employee: any) => (
            <EmployeeCard data={employee}/>
          ))}
        </div>
      </div>
    </div>
  )
}
