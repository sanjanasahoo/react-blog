
import { useState } from 'react'
import formStyle from '../styles/Form.module.css'
export default function Register () {
    const [user,setUser] = useState({name:'',email:'',password:'',password2:''})
    const onSubmit =(e)=>{
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch('https://blogged-for-you.herokuapp.com/api/register',requestOptions)
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
    return (
        <form className={formStyle.form} onSubmit={onSubmit}>
            <div className={formStyle.inputDiv}>
                <label htmlFor="name">Name</label>
                <input type="name"  onChange={(e)=>setUser({...user,name:e.target.value})}className={formStyle.formInput} required/>
            </div>
            <div className={formStyle.inputDiv}>
                <label htmlFor="email">E-mail</label>
                <input type="email" onChange={(e)=>setUser({...user,email:e.target.value})} className={formStyle.formInput} required/>
            </div>
            <div className={formStyle.inputDiv}>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e)=>setUser({...user,password:e.target.value})} className={formStyle.formInput} required/>
            </div>
            <div className={formStyle.inputDiv}>
                <label htmlFor="password2">Password 2</label>
                <input type="password2" onChange={(e)=>setUser({...user,password2:e.target.value})} className={formStyle.formInput} required/>
            </div>
            <input type="submit" value="register"/>
        </form>
      
                )
}



