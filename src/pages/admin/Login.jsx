import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import login from "../../services/auth.service.js/login"
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast"

const Login = () => {

    // const [formData, setFormData] = useState({
    //     username: "",
    //     password: ""
    // })
    const { setAuth } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({
        username: false,
        password: false
    });
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const newErrors = { ...errors };

        if (touched.username) {
            if (!username.trim()) {
                newErrors.username = "Please Enter Username"
            }
            else {
                newErrors.username = ""
            }
        }

        if (touched.password) {
            if (!password.trim()) {
                newErrors.password = "Please Enter Password"
            }
            else if (password.length < 6) {
                newErrors.password = "Password must be greater than 6 characters"
            }
            else {
                newErrors.password = ""
            }
        }
        setErrors(newErrors)
    }, [username, password, touched])

    const validate = () => {

        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = "Please Enter Username"
        }

        if (!password.trim()) {
            newErrors.password = "Please Enter Password"
        }
        else if (password.length < 6) {
            newErrors.password = "Password must be greater than 6 characters"
        }

        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) {
            return false
        }

        return true;

    }
    const handleLogin = async (e) => {
        e.preventDefault()
        setTouched({
            username: true,
            password: true
        });
        if (!validate()) return;

        try {
            const data = { username, password };
            const getResult = await login(data)
            if (getResult.result) {
                const result = getResult.result
                // setAuth({token: result.token, username: result.username, usertype: result.usertype})

                // setAuth(localStorage.setItem("auth", JSON.stringify({
                //     token: result.token, username: result.username, usertype: result.usertype
                // })))

                setAuth({
                    token: result.token,
                    username: result.username,
                    fullname: result.fullname,
                    usertype: result.usertype
                });
                const currentPath = location.pathname;
                if (currentPath === "/login") {
                    result.usertype === 1 ? (navigate('/admin/myprofile'), toast.success("Login Successful!")) : toast.error("Unauthorized! Please Enter Valid Credentials")
                }
                else if (currentPath === "/") {
                    result.usertype === 2 ? (navigate('/user/myprofile'), toast.success("Login Successful!")) : toast.error("Unauthorized! Please Enter Valid Credentials")

                }
                else if (currentPath === "/signin") {
                    result.usertype === 2 ? (navigate('/user/myprofile'), toast.success("Login Successful!")) : toast.error("Unauthorized! Please Enter Valid Credentials")
                }
            }
            else {
                throw Error("Unauthorized! Please Enter Valid Credentials")
            }

        }
        catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

            {/* Abstract decorative shapes */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 relative z-10 transition-all duration-300 hover:shadow-purple-500/20">

                <div className="mb-8 text-center">
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-2 drop-shadow-sm">
                        Welcome Back
                    </h2>
                    <p className="text-purple-200/80 text-sm font-medium">Please enter your details to sign in</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-purple-100 ml-1">Username</label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onBlur={() => setTouched(t => ({ ...t, username: true }))}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-200/50 focus:outline-none focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 blur-sm -z-10"></div>
                        </div>
                        {touched.username && errors.username && (
                            <p className="text-red-300 text-xs ml-1 animate-pulse">{errors.username}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-purple-100 ml-1">Password</label>
                        <div className="relative group">
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-200/50 focus:outline-none focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 blur-sm -z-10"></div>
                        </div>
                        {touched.password && errors.password && (
                            <p className="text-red-300 text-xs ml-1 animate-pulse">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transform hover:-translate-y-0.5 transition-all duration-200 hover:shadow-purple-500/40 active:scale-95"
                    >
                        Sign In
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
