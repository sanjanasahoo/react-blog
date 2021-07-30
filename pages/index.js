
import PostList from '../components/PostList'
import Search from '../components/Search'
import {useState,useEffect} from 'react'
import useSWR from 'swr'
import Nav from '../components/Nav'
import Header from '../components/Header'
import {toast} from 'react-toastify'; 
const fetcher = url => fetch(url).then(r => r.json())

export default  function Home({authors}) {
  const [token,setToken] = useState(null)
  const [url,setUrl] = useState("https://blogged-for-you.herokuapp.com/api/all-posts?sort=newest")
  const [authorPosts,setPosts] = useState(null)
  const defaultRegUrl = 'https://blogged-for-you.herokuapp.com/api/posts/'
  const defaultRegHeader = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  }
  const [registeredUrl,setRegUrl]= useState(defaultRegUrl)
  const [reqHeader,setReqHeader] = useState(defaultRegHeader)
  function onSearch(word,selected,sort){
    setUrl(`https://blogged-for-you.herokuapp.com/api/all-posts`+`?sort=${sort}`+`&author=${selected.name}`+`&search=${word}`)
  
  }
  function onDelete(id){
    setRegUrl(`https://blogged-for-you.herokuapp.com/api/posts/${id}`)
    setReqHeader({
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      
    })
  }
  
  const { data, error } = useSWR(url,fetcher)
  useEffect( ()=>{
   const fetchData =async()=>{
     setToken (JSON.parse(localStorage.getItem('token')))
     if(!token) {
      return
     }
     reqHeader.headers.Authorization = token
     if(reqHeader.method!=='GET') {
       const deletedPostRes = await fetch(registeredUrl, reqHeader);
       const deletedPost = await deletedPostRes.json()
       if (deletedPost.errors) toast.error(deletedPost.errors[0].message)
       else {
           toast.success("Post deleted Successfully")
       }
     }
     const authorPostsRes = await fetch(defaultRegUrl,defaultRegHeader)
     const authorPosts = await authorPostsRes.json();
     setPosts(authorPosts)
    }
    
     fetchData() 
    }
    );
   
  if(!data ) return <div>Loading...</div>
  
  return (
    <>
    <Header/>
    <Nav/>
    <Search onSearch={onSearch} selectdata ={authors}/>
    <PostList posts={authorPosts?authorPosts:data} onDelete={onDelete} />
    </>
  )
}
export const getStaticProps= async()=>{

  const res = await fetch(`https://blogged-for-you.herokuapp.com/api/authors`)
  const authors = await res.json()
  return {
    props : {authors}
  }
}


