import { Link, redirect } from "react-router"
import './RootPage.css'
import { FiClock, FiUsers } from "react-icons/fi"

const cardsData = [
  {
    icon: <FiUsers />,
    title: 'Employees',
    description: 'Manage employee, view details, and update employee information',
    link: '/employees'
  },
  {
    icon: <FiClock />,
    title: 'Timesheets',
    description: 'Track, create, and manage employee work hours',
    link: '/timesheets'
  },
]

export default function RootPage() {
  return (
  <div className="home-cont">
    <h1>Welcome to the <span style={{color:"#1E3A8A"}}>Employee Management System</span></h1>

    <div className="home-card-cont">
      {cardsData.map((item:any, index:number) => (
      <Link to={item.link}>
      <div key={index} className="home-card">
        <div>{item.icon}</div>
        <h1 className="">{item.title}</h1>
        <p>{item.description}</p>
      </div>
      </Link>
      ))}
    </div>
  </div>
  )
}
