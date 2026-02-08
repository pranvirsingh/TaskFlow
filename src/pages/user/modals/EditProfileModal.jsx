import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { validateFullName, validateEmail, validateMobile } from "../../../utils/validators"
import { updateProfile } from "../../../services/auth.service"
const EditProfileModal = ({ open, onClose, profile, setProfile }) => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: ""
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (profile) {
            setFormData({
                fullName: profile.fullName || "",
                email: profile.email || "",
                mobile: profile.mobile || ""
            })
            setErrors({})
        }
    }, [profile, open])

    const validate = () => {

        const newErrors = {}

        const fullNameError = validateFullName(formData.fullName)
        const emailError = validateEmail(formData.email)
        const mobileError = validateMobile(formData.mobile)

        if (fullNameError) newErrors.fullName = fullNameError
        if (emailError) newErrors.email = emailError
        if (mobileError) newErrors.mobile = mobileError

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'mobile') {
            if (!/^\d*$/.test(value)) return
            if (value.length > 10) return
        }

        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const handleSave = async () => {
        if (validate()) {
            // console.log("Saving profile:", formData)
            const res = await updateProfile(formData)
            if (res.status === 200) {
                toast.success("Profile updated successfully!")
                setProfile(prof => ({ ...prof, data: { ...prof.data, fullName: formData.fullName, email: formData.email, mobile: formData.mobile } }));
                onClose()
            } else {
                toast.error("Failed to update profile")
            }
        } else {
            toast.error("Kindly Enter Valid Details")
        }
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">

                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-5">

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            type="text"
                            className={`w-full px-4 py-2.5 rounded-xl border ${errors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:ring-purple-500/20 focus:border-purple-500'} bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 transition-all duration-200`}
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <p className="text-xs text-red-500 ml-1">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:ring-purple-500/20 focus:border-purple-500'} bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 transition-all duration-200`}
                            placeholder="name@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Mobile Number</label>
                        <input
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            type="tel"
                            className={`w-full px-4 py-2.5 rounded-xl border ${errors.mobile ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:ring-purple-500/20 focus:border-purple-500'} bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 transition-all duration-200`}
                            placeholder="10 digit mobile number"
                            maxLength={10}
                        />
                        {errors.mobile && <p className="text-xs text-red-500 ml-1">{errors.mobile}</p>}
                    </div>

                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-200/50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EditProfileModal
