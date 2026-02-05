import { useState } from 'react'
import '/src/styles/App.css'
import Login from '../pages/Login'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
    return <RouterProvider router={router} />
    // return (
    //     <div className='App'>
    //         <Login />
    //     </div>
    // )

}

export default App
