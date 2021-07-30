import Link from "next/link"
import remark from 'remark'
import html from 'remark-html'
import Image from 'next/image'
import { parseISO, format } from 'date-fns'
const post = ({post}) => {
    return (
        <div className="details-box">
            <h1>{post.title}</h1> 
            <div className="img-div">
            <Image className="blog-image" src={`https://blogged-for-you.herokuapp.com/uploads/${post.imageFileName}`} alt="" height= '400'width='800'/>
            </div>
            <p>{post.createdAt}</p>
            <div className="details" dangerouslySetInnerHTML={{ __html: post.content }} />
            <br/>
            <div className="backLink"><Link href ='/'>Go Back</Link></div>
        </div>
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