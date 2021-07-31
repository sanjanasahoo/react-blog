import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function Logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.setItem('isLoggedIn','false')
    const router = useRouter()
    toast.success("Logged Out Successfully")
    router.push('/')
    return null
}