
import PostList from '../components/PostList'
import Search from '../components/Search'
import {useState,useEffect} from 'react'
import useSWR from 'swr'
import Nav from '../components/Nav'
import Header from '../components/Header'
import {toast} from 'react-toastify'; 
import { useRouter } from 'next/dist/client/router'
const fetcher = url => fetch(url).then(r => r.json())

export default  function Home({authors,posts}) {
  const [token,setToken] = useState(null)
  const [searchData,setData] = useState({word:'',selected:{selectedId:'',name:''},sort:false})
  const [url,setUrl] = useState("https://blogged-for-you.herokuapp.com/api/all-posts?sort=newest")
  const [registeredUrl,setRegUrl]= useState('')
  const [reqHeader,setReqHeader] = useState('')
  function onSearch(word,selected,sort){
   let sortBy = sort ? 'oldest' :'newest'
    setUrl(`https://blogged-for-you.herokuapp.com/api/all-posts`+`?sort=${sortBy}`+`&author=${selected.label}`+`&search=${word}`)
    setData({word,selected:{selectedId:selected.value,name:selected.label},sort})
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


  const { data, mutate,error } = useSWR( url ,fetcher,{posts})
  useEffect( ()=>{
   const fetchData =async()=>{
     setToken (JSON.parse(localStorage.getItem('token')))
     if(!token || reqHeader=='') {
      return
     }
     reqHeader.headers.Authorization = token

       const deletedPostRes = await fetch(registeredUrl, reqHeader);
       const deletedPost = await deletedPostRes.json()
       if (deletedPost.errors) toast.error(deletedPost.errors[0].message)
       else {
           toast.success("Post deleted Successfully")
           mutate()
       }
     
    }
    
     fetchData() 
    },[registeredUrl,reqHeader,token,mutate]
    );
   
  if(!data ) return <div>Loading...</div>
  return (
    <>
    <Header/>
    <Nav/>
    <Search onSearch={onSearch} selectdata ={authors}data={searchData} />
    <PostList posts={data} onDelete={onDelete} />
    </>
  )
}
export async function getServerSideProps(){
  const postsRes = await fetch('https://blogged-for-you.herokuapp.com/api/all-posts?sort=newest')
  const posts = await postsRes.json()
  const res = await fetch(`https://blogged-for-you.herokuapp.com/api/authors`)
  const authors = await res.json()
  return {
    props : {authors,posts}
  }
}


