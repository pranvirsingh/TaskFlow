import { useState } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { CircleUserRound, Menu, ChevronLeft, Search, Bell, ChevronRight, Home } from "lucide-react"
import taskflow2 from "/src/assets/taskflow2.png"
import AdminPanelNav from "./AdminPanelNav"
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast"
import Footer from "../../components/common/Footer"

const AdminLayout = () => {
    const [open, setOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const { auth, setAuth } = useAuth()
    const location = useLocation()

    const handleLogout = () => {
        setAuth({
            token: null,
            username: null,
            fullname: null,
            usertype: null
        })
        toast.success("Logged out successfully")
    }

    // Generate breadcrumbs from path
    const getBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(p => p)
        return (
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Home className="w-4 h-4" />
                {paths.map((path, index) => (
                    <div key={path} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className={`capitalize ${index === paths.length - 1 ? 'font-semibold text-purple-600' : ''}`}>
                            {path}
                        </span>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} 
                bg-gray-900 text-gray-200 flex flex-col transition-all duration-300 ease-in-out fixed h-full z-30 shadow-xl overflow-x-hidden`}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                    {isSidebarOpen && (
                        <div className="flex items-center gap-2 animate-fadeIn">
                            <img className="w-8 h-8" src={taskflow2} alt="Logo" />
                            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 bg-clip-text text-transparent font-extrabold tracking-wide text-lg">
                                TaskFlow
                            </span>
                        </div>
                    )}
                    {!isSidebarOpen && (
                        <div className="w-full flex justify-center">
                            <img className="w-8 h-8" src={taskflow2} alt="Logo" />
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
                    <AdminPanelNav isSidebarOpen={isSidebarOpen} />
                </div>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    >
                        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>

                {/* Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">

                    {/* Left: Breadcrumbs */}
                    <div className="hidden md:block">
                        {getBreadcrumbs()}
                    </div>

                    {/* Mobile Menu Button (Visible only on small screens) */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Menu />
                    </button>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">

                        {/* Search Bar (Visual) */}
                        {/* <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 border border-transparent focus-within:border-purple-300 transition-all">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none focus:ring-0 text-sm text-gray-700 w-32 focus:w-48 transition-all placeholder-gray-400"
                            />
                        </div> */}

                        {/* Notifications */}
                        {/* <button className="relative p-2 text-gray-500 hover:text-purple-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button> */}

                        <div className="h-6 w-px bg-gray-200 mx-1"></div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 pr-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors">
                                    <CircleUserRound className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                    {auth?.fullname?.split(' ')[0]}
                                </span>
                            </button>

                            {open && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setOpen(false)}
                                    ></div>
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform origin-top-right transition-all z-20">
                                        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                            <p className="text-sm font-bold text-gray-900 truncate">{auth?.fullname}</p>
                                            <p className="text-xs text-gray-500 truncate">@{auth?.username}</p>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            <Link
                                                to="/admin/myprofile"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
                                            >
                                                <CircleUserRound className="w-4 h-4" />
                                                My Profile
                                            </Link>
                                            <div className="h-px bg-gray-100 my-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>

                <Footer />

            </div>
        </div>
    )
}

export default AdminLayout
