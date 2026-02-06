import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth.service"
import { useAuth } from "../context/AuthContext";

const Login = () => {

    // const [formData, setFormData] = useState({
    //     username: "",
    //     password: ""
    // })
    const {setAuth} = useAuth()
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
    const handleLogin = async (e) => {
        e.preventDefault()
        setTouched({
            username: true,
            password: true
        });
        if(!validate()) return;

        try{
            const data = { username, password };
            const getResult = await authService.login(data)
            if(getResult.result) {
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
                    result.usertype === 1 ? navigate('/admin/myprofile') : alert("Unauthorized! Please Enter Valid Credentials")
                }
                else if (currentPath === "/") {
                    result.usertype === 2 ? navigate('/user/myprofile') : alert("Unauthorized! Please Enter Valid Credentials")

                }
                else if (currentPath === "/signin") {
                    result.usertype === 2 ? navigate('/user/myprofile') : alert("Unauthorized! Please Enter Valid Credentials")
                }
            }
            else{
                throw Error("Unauthorized! Please Enter Valid Credentials")
            }

        }
        catch(err){
            alert(err.message)
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
