import Link from "next/link"
import remark from 'remark'
import html from 'remark-html'
import { parseISO, format } from 'date-fns'

const post = ({post}) => {
    return (
        <>
            <h3>{post.title}</h3> 
            <p>{post.createdAt}</p>
            <p>{post.content}</p>
            <br/>
            <Link href ='/'>Go Back</Link>
        </>
    )
}
export const getServerSideProps = async (context)=>{
    const res = await fetch(`https://blogged-for-you.herokuapp.com/api/posts/${context.params.id}`)
    const post = await res.json()
    const date = parseISO(post.createdAt.toString())
    const processedContent = await remark()
    .use(html)
    .process(post.content)
  const contentHtml = processedContent.toString()
  post.content = contentHtml
  post.createdAt = date.toDateString()
    return {
        props:{
            post
        }
    }
}
export default post