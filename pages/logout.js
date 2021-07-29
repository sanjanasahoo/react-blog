import { useRouter } from 'next/router'

export default function Logout(){
    localStorage.removeItem('token')
    localStorage.setItem('isLoggedIn','false')
    const router = useRouter()
    router.push('/')
    return null
}