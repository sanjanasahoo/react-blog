import styles from '../styles/Post.module.css'
import PostItem from './PostItem'

const PostList = ({ posts }) => {
    return (
        <>
            <div className={styles.grid}>
                {posts.map(post => <PostItem key={post.id} post={post}/>)}
            </div>
        </>
    )
}

export default PostList
