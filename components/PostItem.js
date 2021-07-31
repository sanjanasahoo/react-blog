import postStyles from '../styles/Post.module.css'
import Link from 'next/link'
import Update from './Update'
const PostItem = ({post,onDelete}) => {
    
    return (
            <Link href="/post/[id]" as={`/post/${post.id}`}>
              <a className={postStyles.card}>
                  <h3 >
                      {post.title} &rarr;
                      <p>{post.author.name}</p>
                      
                  </h3>
                  <Update post ={post} onDelete={onDelete}/>
              </a>
            </Link>
      
    )
}

export default PostItem