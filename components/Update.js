import Link from "next/dist/client/link";
import postStyles from '../styles/Post.module.css'

const Update = ({post,onDelete}) => {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    const userId = JSON.parse(localStorage.getItem('userId'))
    const handleDelete =(e)=>{
        e.preventDefault()
        onDelete(post.id)
    }
    
    return (
        <div>
            {isLoggedIn && post.author.id==userId &&
             <div className={postStyles.buttonDiv}>
                 <button className="button" onClick={handleDelete}>Delete</button>
                  <Link passHref href={{pathname:'/create',query:{id:post.id}}}>
                    <button className="button">Update</button>
                  </Link>
            </div>}
        </div>
    )
}

export default Update
