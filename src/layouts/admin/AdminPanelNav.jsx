import { NavLink } from "react-router-dom"
import { LayoutDashboard, FolderKanban, CheckSquare, ListTodo, UserCircle, User } from "lucide-react"

const AdminPanelNav = ({ isSidebarOpen }) => {

    const navItems = [
        { to: "/admin/myprofile", icon: UserCircle, label: "My Profile" },
        { to: "/admin/project", icon: FolderKanban, label: "Project" },
        // { to: "/admin/tasks", icon: ListTodo, label: "Tasks" },
        { to: "/admin/mytask", icon: CheckSquare, label: "My Tasks" },
        { to: "/admin/membermanager", icon: User, label: "Member Manager" }
    ]

    return (
        <nav className="flex-1 p-2 space-y-1">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `flex items-center ${isSidebarOpen ? "gap-3" : ""} px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                        ${isActive
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                            : "hover:bg-gray-800 text-gray-400 hover:text-white"
                        }
                        ${!isSidebarOpen && "justify-center px-2"}
                        `
                    }
                >
                    <item.icon className={`w-5 h-5 min-w-[20px] ${!isSidebarOpen && "w-6 h-6"}`} />

                    <span className={`whitespace-nowrap transition-all duration-300 origin-left
                        ${isSidebarOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0 overflow-hidden"}
                    `}>
                        {item.label}
                    </span>

                    {/* Tooltip for collapsed state */}
                    {!isSidebarOpen && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-gray-700">
                            {item.label}
                        </div>
                    )}
                </NavLink>
            ))}
        </nav>
    )
}

export default AdminPanelNav