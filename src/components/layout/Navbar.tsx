import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <NavLink exact to="/" className="navbar-list-item">
                    Home
                </NavLink>
                <NavLink to="/dashboard" className="navbar-list-item">
                    Dashboard
                </NavLink>
                <NavLink to="/about" className="navbar-list-item">
                    About
                </NavLink>
            </ul>
        </nav>
    )
}

export default Navbar
