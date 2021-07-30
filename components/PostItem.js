import postStyles from '../styles/Post.module.css'
import Link from 'next/link'
const PostItem = ({post,onDelete}) => {
    const isloggedIn = localStorage.getItem('token')
    const handleDelete =(e)=>{
        e.preventDefault()
        onDelete(post.id)
    }
    return (
            <Link href="/post/[id]" as={`/post/${post.id}`}>
              <a className={postStyles.card}>
                  <h3 >
                      {post.title} &rarr;
                      <p>{post.author.name}</p>
                      
                  </h3>
                  {isloggedIn && <div className={postStyles.buttonDiv}><button className="button" onClick={handleDelete}>Delete</button>
                  <Link passHref href={{pathname:'/create',query:{id:post.id}}}><button className="button">Update</button></Link>
                  </div>}
              </a>
            </Link>
      
    )
}

export default PostItem