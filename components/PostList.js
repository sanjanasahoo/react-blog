import styles from '../styles/Post.module.css'
import PostItem from './PostItem'

const PostList = ({ posts ,onDelete}) => {
    return (
        <>
            {posts.length==0?(<div>No posts found</div>):
            (<div className={styles.grid}>
                {posts.map(post => <PostItem key={post.id} post={post} onDelete={onDelete}/>)}
            </div>)}
        </>
    )
}

export default PostList
