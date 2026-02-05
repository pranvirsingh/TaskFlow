import { createBrowserRouter, UNSAFE_RSCDefaultRootErrorBoundary } from "react-router-dom";
import Login from "../pages/login";
import Error from "../components/Error";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout"

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
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            path: "myprofile",
            element: <div>My Profile</div>
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
  },

  // User Layout
  {
    path: "/user",
    element: <UserLayout />,
    children: [
        {
            path: "myprofile",
            element: <div>My Profile</div>
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
  },


  {
    path: "*",
    element: <Error />
  }
]);

export default router