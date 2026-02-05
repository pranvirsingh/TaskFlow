import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {

    // const [formData, setFormData] = useState({
    //     username: "",
    //     password: ""
    // })

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({
        username: false,
        password: false
    });
    const navigate = useNavigate()

    useEffect(() => {
    const newErrors = { ...errors };

        if (touched.username) {
            if(!username.trim()){
                newErrors.username = "Please Enter Username"
            }
            else{
                newErrors.username = ""
            }
        }

        if (touched.password) {
            if(!password.trim()){
                newErrors.password = "Please Enter Password"
            }
            else if(password.length < 6){
                newErrors.password = "Password must be greater than 6 characters"
            }
            else{
                newErrors.password = ""
            }
        }
        setErrors(newErrors)
    }, [username, password, touched])

    const validate = () => {

        const newErrors = {};
        if(!username.trim()){
            newErrors.username = "Please Enter Username"
        }

        if(!password.trim()){
            newErrors.password = "Please Enter Password"
        }
        else if(password.length < 6){
            newErrors.password = "Password must be greater than 6 characters"
        }

        setErrors(newErrors)
        if(Object.keys(newErrors).length > 0){
            return false
        }

        return true;

    }
    const handleLogin = (e) => {
        e.preventDefault()
        setTouched({
            username: true,
            password: true
        });
        if(!validate()) return;

        const currentPath = location.pathname;
        if (currentPath === "/login") {
            console.log("Admin login");

            navigate('/admin/myprofile')
        }
        else if (currentPath === "/") {
            console.log("User login");
            navigate('/user/myprofile')

        }
        else if (currentPath === "/signin") {
            console.log("User login");
            navigate('/user/myprofile')
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-65 from-gray-900 to-purple-500 px-4">
    {/* <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4"> */}

      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
            <div>
                <div className="group p-[2px] rounded-md
            bg-gray-300 focus-within:bg-linear-to-bl focus-within:from-gray-900 focus-within:to-purple-500 transition">
                    <label className="block text-sm font-medium text-gray-600 mb-1 group-focus-within:text-white">
                    Username
                    </label>
                    <input
                    
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onBlur={() => setTouched(t => ({ ...t, username: true }))}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-md px-3 py-2
            bg-white
            focus:outline-none focus:shadow-xl"
                    />
                </div>
                <p className="text-red-500 transition">{errors.username}</p>
          </div>
            <div>
                <div className="group p-[2px] rounded-md
            bg-gray-300 focus-within:bg-linear-to-bl focus-within:from-gray-900  focus-within:to-purple-500 transition">
                    <label className="block text-sm font-medium text-gray-600 mb-1 group-focus-within:text-white">
                    Password
                    </label>
                    <input 
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onBlur={() => setTouched(t => ({ ...t, password: true }))}
                    onChange={(e) => setPassword(e.target.value)}

                    className="w-full rounded-md px-3 py-2
            bg-white
            focus:outline-none focus:shadow-xl"
                    />
                </div>
                <p className="text-red-500">{errors.password}</p>

            </div>
          <button
            type="submit"
            className="w-full text-gray-600 py-2 rounded-md
                        transition font-bold hover:shadow-xl bg-gray-300 bg-linear-to-bl hover:from-gray-900 hover:to-purple-500 hover:text-white"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
