import headerStyle from '../styles/Header.module.css'
const Header = () => {
    return (
        <>
        <div className={headerStyle.banner}>
           <span className={headerStyle.blogTitle}>Cameo blog</span> 
        </div>
        </>
    )
}

export default Header
