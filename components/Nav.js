import React from 'react'
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
const Nav = ({isLoggedIn}) => {
    return (
        <nav className={navStyles.nav}>
        {!isLoggedIn?
        (<ul>
        <li>
        <Link href="/">Home</Link>
        </li>
        <li>
        <Link href="/login">Login</Link>

        </li>
        <li>
        <Link href="/register">Register</Link>

        </li>
        <li></li>
        </ul>):
        (<ul>
            <li>Logout</li>
        </ul>)}
        </nav>
    )
}

export default Nav