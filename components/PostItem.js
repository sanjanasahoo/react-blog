import postStyles from '../styles/Post.module.css'
import Link from 'next/link'
const PostItem = ({post}) => {
    return (
       
            <Link href="/post/[id]" as={`/post/${post.id}`}>
              <a className={postStyles.card}>
                  <h3 >
                      {post.title} &rarr;
                      <p>{post.author.name}</p>
                      
                  </h3>
                  
              </a>
            </Link>
      
    )
}

export default PostItem