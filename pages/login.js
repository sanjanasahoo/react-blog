import formStyle from '../styles/Form.module.css'
const login = () => {
    return (
       
   
        <form className={formStyle.form}>
            <div className={formStyle.inputDiv}>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" className="form-input" required/>
            </div>
            <div className={formStyle.inputDiv}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="form-input" required/>
            </div>
        </form>
      
                )
}

                export default login
