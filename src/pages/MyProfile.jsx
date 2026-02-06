import { useEffect, useState, Suspense } from "react"
import { myprofile } from "../services/auth.service"
import { useAuth } from "../context/AuthContext"
import { CircleUserRound, House } from "lucide-react"
const MyProfile = () => {
    const {setAuth} = useAuth()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        myprofile().then(res => setProfile(res)).catch(err => {
            alert("Something Went Wrong!"); 
            setAuth({
                token: null,
                username: null,
                fullname: null,
                usertype: null
            });
        })
    }, [])

    const loadingSec = (
        <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    )


  return (
    <Suspense fallback={loadingSec}>
        <div>
            {/* <div className="mx-auto mt-4 mb-2 border-b ">
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

                <nav className="text-sm text-gray-500 mt-1">
                    <span className="hover:text-gray-700"><House /></span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800 font-medium">My Profile</span>
                </nav>
            </div> */}
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                <div className="flex items-center gap-4 border-b pb-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center text-3xl font-bold text-gray-600">
                        <CircleUserRound className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{profile?.data.fullName}</h2>
                        <p className="text-gray-500">{profile?.data.userName}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-gray-500 font-medium">Email</span>
                        <span className="text-gray-800">{profile?.data.email}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 font-medium">Mobile</span>
                        <span className="text-gray-800">{profile?.data.mobile}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 font-medium">Status</span>
                        <span className={`font-semibold ${profile?.data?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {profile?.data.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 font-medium">Created At</span>
                        <span className="text-gray-800">{new Date(profile?.data.createdAt).toLocaleString()}</span>
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Edit Profile
                    </button>
                </div>
            </div>
        </div>
    </Suspense>
  )
}

export default MyProfile