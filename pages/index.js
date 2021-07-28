import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Nav from '../components/Nav'
import PostList from '../components/PostList'
import Search from '../components/Search'
import {useState,useEffect} from 'react'
import useSWR ,{mutate}from 'swr'
const fetcher = url => fetch(url).then(r => r.json())

export default  function Home({authors}) {
  const [url,setUrl] = useState("https://blogged-for-you.herokuapp.com/api/all-posts?sort=newest")
  const [authorPosts,setPosts] = useState([])
  function onSearch(word,selected,sort){
    setUrl(`https://blogged-for-you.herokuapp.com/api/all-posts`+`?sort=${sort}`+`&author=${selected.name}`+`&search=${word}`)
  
  }
  
  const { data, error } = useSWR(url,fetcher)
  useEffect( ()=>{
   const fetchData =async()=>{
      const token = 'Bearer '+JSON.parse(localStorage.getItem('token')).accessToken;
      console.log(token)
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      };
      const authorPostsRes = await fetch('https://blogged-for-you.herokuapp.com/api/posts/', requestOptions);
     const authorPosts = await authorPostsRes.json();
     console.log(authorPosts)
     setPosts(authorPosts)
    }
    
     fetchData() 
    },[]
    );
  if(!data ) return <div>Loading...</div>
  
  return (
    <>
    <Search onSearch={onSearch} selectdata ={authors}/>
    <PostList posts={authorPosts.length>0?authorPosts:data}/>
    </>
  )
}
export const getStaticProps= async()=>{

  const res = await fetch(`https://blogged-for-you.herokuapp.com/api/authors`)
  const authors = await res.json()
  console.log(authors)
  return {
    props : {authors}
  }
}


