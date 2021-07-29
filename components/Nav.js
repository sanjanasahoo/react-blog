import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import { useEffect,useState } from 'react'

const Nav = () => {
    const [key, setKey] = useState(undefined)
    useEffect(()=>{
        let key = JSON.parse (localStorage.getItem('isLoggedIn'))
        setKey(key)
        }
   ,[key])
    if(key){
        return(
            <nav className={navStyles.nav}>
            <ul>
            <li><Link href="/logout">Logout</Link></li>
            <li><Link href="/create">Create</Link></li>
            </ul>
            </nav>
        )
    }
    return (
        <nav className={navStyles.nav}>
        <ul>
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
        </ul>
        </nav>
    )
}

export default Nav