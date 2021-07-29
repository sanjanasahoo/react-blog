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
                  {isloggedIn && <div><button onClick={handleDelete}>delete</button></div>}
              </a>
            </Link>
      
    )
}

export default PostItem