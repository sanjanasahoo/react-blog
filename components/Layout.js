import styles from '../styles/Layout.module.css'
import Nav from './Nav'
import Header from './Header'
const Layout = ({ children }) => {
    return (
    
            <div className={styles.container}>
                <Header/>
                <Nav/>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
      
    )
}

export default Layout