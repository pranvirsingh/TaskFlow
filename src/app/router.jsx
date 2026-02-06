import { createBrowserRouter, UNSAFE_RSCDefaultRootErrorBoundary } from "react-router-dom";
import Login from "../pages/Login";
import Error from "../components/Error";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout"
import ProtectedRoute from "../layouts/ProtectedRoutes";
import MyProfile from "../pages/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signin",
    element: <Login />
  },

  // Admin Layout
  {
    element: <ProtectedRoute allowedRoles={[1]} />,
    children: [
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    path: "myprofile",
                    element: <MyProfile />
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
    path: "*",
    element: <Error />
  }
]);

export default router