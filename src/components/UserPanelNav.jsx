import { NavLink } from "react-router-dom"

const UserPanelNav = () => {
  return (
        <nav className="flex-1 p-4 space-y-2">

          <NavLink
            to="/user/myprofile"
            className="block px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            My Profile
          </NavLink>

          <NavLink
            to="/user/projects"
            className="block px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Projects
          </NavLink>

          {/* <NavLink
            to="/user/tasks"
            className="block px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Tasks
          </NavLink> */}
          <NavLink
            to="/user/mytask"
            className="block px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            My Tasks
          </NavLink>

        </nav>

  )
}

export default UserPanelNav