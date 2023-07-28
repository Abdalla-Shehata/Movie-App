import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './component/navbar/Navbar'

export default function Root(props) {
    return (
        <>
            <Navbar DATA={props.DATA} logout={props.logout} />
            <div className="container">
                <Outlet />
            </div>

        </>
    )
}
