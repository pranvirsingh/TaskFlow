import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    // const [auth, setAuth] = useState({
    //     token: null,
    //     username: null,
    //     usertype: null
    // })

    const [auth, setAuth] = useState(() => {
        const saved = localStorage.getItem("auth");
        return saved
        ? JSON.parse(saved)
        : {
            token: null,
            username: null,
            fullname: null,
            usertype: null
            };
    });
    useEffect(() => {
        if (auth && auth.token) {
            localStorage.setItem("auth", JSON.stringify(auth));
        } else {
            localStorage.removeItem("auth");
        }
    }, [auth]);


  return (
    <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};
