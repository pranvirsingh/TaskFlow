import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import taskflow2 from "../assets/taskflow2.png"
import UserPanelNav from "../components/UserPanelNav";
import { useAuth } from "../context/AuthContext";

const UserLayout = () => {
    const [open, setOpen] = useState(false)
    const { auth, setAuth } = useAuth()
    const handleLogout = () => {
        setAuth({
            token: null,
            username: null,
            fullname: null,
            usertype: null
        });
    }
    
return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
           
            <div className="h-16 flex items-center justify-center gap-2 text-xl font-bold border-b border-gray-700 px-4">
                <img className="w-9 h-8" src={taskflow2}/>
                <div className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">TaskFlow</div>
            </div>

            <UserPanelNav />
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="h-16 bg-white shadow-lg flex items-center px-6 justify-end-safe">
          <h1 className="text-lg font-semibold text-gray-800">
            {auth?.fullname}
          </h1>
        <div className="relative">
        <button
            onClick={() => setOpen(!open)}
            className="p-1 rounded-full hover:bg-gray-200 transition"
        >
            <CircleUserRound className="w-7 h-7 text-gray-700" />
        </button>

        {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border-t border-blue-600 overflow-hidden">
                <Link to="/user/myprofile">
                    <button onClick={() => setOpen(!open)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-bold">
                        My Profile
                    </button>
                </Link>
                <Link to="/signin">
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600 font-bold">
                        Logout
                    </button>
                </Link>
            </div>
        )}
        </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default UserLayout