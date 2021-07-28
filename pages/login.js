import formStyle from '../styles/Form.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
export default function Login(props) {
    console.log(props)
    const router = useRouter()
    const [user,setUser] = useState({email:'',password:''})
    const onSubmit =(e)=>{
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch("https://blogged-for-you.herokuapp.com/api/login",requestOptions)
        .then(res=>res.json())
        .then(data=>{
            localStorage.setItem('token',JSON.stringify(data))
            router.push('/')
           // console.log(JSON.parse(localStorage.getItem('token')))
        })
        
    }
    return (
        <>
        <form className={formStyle.form} onSubmit={onSubmit}>
            <div className={formStyle.inputDiv}>
                <label htmlFor="email">E-mail</label>
                <input type="email" onChange={(e)=>setUser({...user,email:e.target.value})} className={formStyle.formInput} required/>
            </div>
            <div className={formStyle.inputDiv}>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e)=>setUser({...user,password:e.target.value})} className={formStyle.formInput} required/>
            </div>
            <input type="submit" value="Login"/>
        </form>
        
        </>
                )
}

       
