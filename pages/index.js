import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Nav from '../components/Nav'
import PostList from '../components/PostList'
import Search from '../components/Search'
import {useState} from 'react'
import useSWR ,{mutate}from 'swr'
const fetcher = url => fetch(url).then(r => r.json())

export default  function Home({authors}) {

  const [url,setUrl] = useState("https://blogged-for-you.herokuapp.com/api/all-posts?sort=newest")
  function onSearch(word,selected,sort){
    setUrl(`https://blogged-for-you.herokuapp.com/api/all-posts`+`?sort=${sort}`+`&author=${selected.name}`+`&search=${word}`)
  
  }
  
  const { data, error } = useSWR(url,fetcher)
  if(!data ) return <div>Loading...</div>
  return (
    <>
    <Search onSearch={onSearch} selectdata ={authors}/>
    <PostList posts={data}/>
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


