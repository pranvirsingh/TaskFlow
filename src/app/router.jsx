import { createBrowserRouter, UNSAFE_RSCDefaultRootErrorBoundary } from "react-router-dom";
import Login from "../pages/user/Login";
import Error from "../components/errors/Error";
import GeneralError from "../components/errors/GeneralError";
import AdminLayout from "../layouts/admin/AdminLayout";
import UserLayout from "../layouts/user/UserLayout"
import ProtectedRoute from "../layouts/ProtectedRoutes";
import MyProfile_Admin from "../pages/admin/MyProfile";
import MyProfile from "../pages/user/MyProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <GeneralError />
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <GeneralError />
    },
    {
        path: "/signin",
        element: <Login />,
        errorElement: <GeneralError />
    },

    // Admin Layout
    {
        element: <ProtectedRoute allowedRoles={[1]} />,
        errorElement: <GeneralError />,
        children: [
            {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                    {
                        path: "myprofile",
                        element: <MyProfile_Admin />
                    },
                    {
                        path: "projects",
                        element: <div>Projects</div>
                    },
                    {
                        path: "tasks",
                        element: <div>Tasks</div>
                    },
                    {
                        path: "mytask",
                        element: <div>My Task</div>
                    },
                ]
            }
        ]
    },


    {
        element: <ProtectedRoute allowedRoles={[2]} />,
        errorElement: <GeneralError />,
        children: [
            {
                path: "/user",
                element: <UserLayout />,
                children: [
                    {
                        path: "myprofile",
                        element: <MyProfile />
                    },
                    {
                        path: "projects",
                        element: <div>Projects</div>
                    },
                    // {
                    //     path: "tasks",
                    //     element: <div>Tasks</div>
                    // },
                    {
                        path: "mytask",
                        element: <div>My Task</div>
                    },

                ]
            }
        ]
    },
    // User Layout
    {
        path: "/error",
        element: <GeneralError />
    },
    {
        path: "*",
        element: <Error />
    }
]);

export default router