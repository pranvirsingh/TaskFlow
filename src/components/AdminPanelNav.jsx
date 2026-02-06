import { NavLink } from "react-router-dom"

const AdminPanelNav = () => {
  return (
    <nav className="flex-1 p-4 space-y-2">

          <NavLink
            to="/admin/myprofile"
            className="block px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            My Profile
          </NavLink>

          <NavLink
            to="/admin/projects"
            className="block px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Projects
          </NavLink>

          <NavLink
            to="/admin/tasks"
            className="block px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Tasks
          </NavLink>
          <NavLink
            to="/admin/mytask"
            className="block px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            My Tasks
          </NavLink>

        </nav>
  )
}

export default AdminPanelNav