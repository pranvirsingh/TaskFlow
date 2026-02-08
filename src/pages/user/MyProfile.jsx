import { useEffect, useState } from "react"
import { myprofile } from "../../services/auth.service"
import { useAuth } from "../../context/AuthContext"
import { CircleUserRound, House } from "lucide-react"
import Loader from "../../components/Loader"
import EditProfileModal from "./modals/EditProfileModal"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const MyProfile = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        myprofile()
            .then(res => {
                if (res.status === 200) {
                    setProfile(res)
                    setLoading(false)
                }
                else {
                    toast.error(res.message);
                    setLoading(false)
                }
            })
            .catch(err => {
                toast.error(err.message);
                // setAuth({
                //     token: null,
                //     username: null,
                //     fullname: null,
                //     usertype: null
                // });
                // setLoading(false)
                // navigate('/error')
            })
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {/* <div className="mx-auto mt-4 mb-2 border-b ">
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

                <nav className="text-sm text-gray-500 mt-1">
                    <span className="hover:text-gray-700"><House /></span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800 font-medium">My Profile</span>
                </nav>
            </div> */}
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden mt-6 border border-gray-100">
                <div className="bg-gradient-to-r from-gray-900 to-purple-600 h-32"></div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="p-1.5 bg-white rounded-full">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex justify-center items-center text-4xl font-bold text-purple-600 border-2 border-purple-100 shadow-inner">
                                <CircleUserRound className="w-12 h-12" />
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ${profile?.data?.isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {profile?.data.isActive ? 'Active Status' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">{profile?.data.fullName}</h2>
                        <p className="text-purple-600 font-medium">@{profile?.data.userName}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="block text-sm font-medium text-gray-500 mb-1">Email Address</span>
                            <span className="text-lg font-semibold text-gray-800 break-all">{profile?.data.email}</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="block text-sm font-medium text-gray-500 mb-1">Mobile Number</span>
                            <span className="text-lg font-semibold text-gray-800">{profile?.data.mobile}</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
                            <span className="block text-sm font-medium text-gray-500 mb-1">Member Since</span>
                            <span className="text-lg font-semibold text-gray-800">{new Date(profile?.data.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="px-6 py-2.5 bg-gradient-to-r from-gray-900 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-200">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
            <EditProfileModal open={openModal} onClose={() => setOpenModal(false)} profile={profile?.data} setProfile={setProfile} />
        </div>
    )
}


export default MyProfile