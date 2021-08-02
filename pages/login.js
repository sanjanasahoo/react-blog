import formStyle from '../styles/Form.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import {toast} from 'react-toastify'; 
export default function Login() {
    const router = useRouter()
    const [user,setUser] = useState({email:'',password:''})
    const onSubmit =(e)=>{
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch(process.env.API_LOGIN_URL,requestOptions)
        .then(res=>res.json())
        .then(data=>{
            if(data.accessToken){
                localStorage.setItem('token',JSON.stringify('Bearer '+data.accessToken))
                localStorage.setItem('isLoggedIn','true')
                localStorage.setItem('userId',data.user.id)
                toast.success("Login Successful")
                router.push('/')
            }
            else{
                if(data.message){
                   toast.error(data.message)
               }
            }            
        })
        
    }
    return (
        <div className={formStyle.formDiv}>
            <h1>Sign In</h1>
            <form className={formStyle.form} onSubmit={onSubmit}>
                <div className={formStyle.inputDiv}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} className={formStyle.formInput} required />
                </div>
                <div className={formStyle.inputDiv}>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className={formStyle.formInput} required />
                </div>
                <div className={formStyle.inputDiv}>
                    <input type="submit" value="Login"  className={formStyle.submitInput}/>
                </div>
            </form>
        </div>
        )
}

       
