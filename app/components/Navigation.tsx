import { NavLink } from "@remix-run/react"
// Quick NaV component!
export default function Navigation () {
  return (
    <nav>
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/constituents/view">View My Constituents</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/constituents/upload">Upload Constituents</NavLink>
        </li>
      </ul>
    </nav>
  )
}