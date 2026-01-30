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
import StyledDropDown from "elements/styledDropDown/StyledDropDown"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const sortOptions = [
  {
    label: 'Oldest Start Date',
    value: 'oldestStartDate'
  },
  {
    label: 'Newest Start Date',
    value: 'newestStartDate'
  },
]

export async function loader() {
  const db = await getDB()
  const employees = await db.all("SELECT * FROM employees;")

  return { employees }
}

export default function EmployeesPage() {
  const { employees } = useLoaderData()
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState(employees);
    const [sortOption, setSortOption] = useState('')
      const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredItems.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredItems.length / recordsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

    const handleSearch = (e:any) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = employees.filter(
      (employee:any) =>
        employee.full_name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.job_title.toLowerCase().includes(query) ||
        employee.phone_number.includes(query) 
    );
    setFilteredItems(filtered);
  };

  const handleSortChange = (e:any) => {
    const option = e.target.value
    setSortOption(option)
    console.log('sort by: ', sortOption)

    const sortedEmployee = filteredItems.sort((a:any, b:any) => {
      if (option === 'oldestStartDate') {
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      } else {
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      }
    })
    setFilteredItems(sortedEmployee)
  }

  return (
    <div className="emp-cont">
      <HeaderNavigator title={'Employees'} description={'Manage employee, view details, and update employee information'} />

      <div>
        <div className="nav-head">
        <SearchBar value={searchQuery} onChange={handleSearch}/>
        <div className="nav-head-icons">
        <StyledDropDown name="sort_date" value={sortOption} onChange={handleSortChange} options={sortOptions} placeholder="Sort by Start date"/>
          <LinkNavigator icon={<RiUserAddLine fontSize={'1.25rem'}/>} title={'Add New Employee'} link={'/employees/new'}/>
          <LinkNavigator icon={<FiClock fontSize={'1.25rem'}/>} title={'Timesheets'} link={'/timesheets'}/>
          </div>
        </div>

        <div className="employee-card-cont">
          {currentRecords.length === 0 ? (<h1>No results found</h1>) : 
          currentRecords.map((employee: any) => (
            <EmployeeCard data={employee}/>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '1rem', alignItems: 'center' }}>
          <FaArrowLeft onClick={goToPreviousPage} style={{cursor: 'pointer'}}/>
          <span>{currentPage} / {totalPages}</span>
          <FaArrowRight onClick={goToNextPage} style={{cursor: 'pointer'}}/>
        </div>
      </div>
    </div>
  )
}
