import { useRouter } from "next/dist/client/router"
import Link from "next/link"
const post = ({post}) => {
    return (
        <>
            <h3>{post.title}</h3> 
            <p>{post.content}</p>
            <br/>
            <Link href ='/'>Go Back</Link>
        </>
    )
}
export const getServerSideProps = async (context)=>{
    const res = await fetch(`https://blogged-for-you.herokuapp.com/api/posts/${context.params.id}`)
    const post = await res.json()
    return {
        props:{
            post
        }
    }
}
export default post