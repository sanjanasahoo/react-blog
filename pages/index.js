import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Nav from '../components/Nav'
import PostList from '../components/PostList'
import Search from '../components/Search'
import useState from 'react'
import useSWR ,{mutate}from 'swr'
const fetcher = url => fetch(url).then(r => r.json())

export default  function Home({posts}) {
  let url = `https://blogged-for-you.herokuapp.com/api/all-posts/`
  //const [flag,setFlag] = useState(false)
  const onSearch =(flag,keyword)=>{
    if(keyword) {
      console.log("hello")
      url += `?search=${keyword}`
      setFlag(true)

    }
  }
  const { data, error } = useSWR(url, fetcher)
  mutate(url)
  if(!data) return <div>Loading...</div>
  return (
    <>
     <Header />
      <Nav />
      <Search onSearch={onSearch}/>
    <PostList posts={data}/>
    </>
  )
}
// export const getStaticProps= async()=>{
//   const res = await fetch(`https://blogged-for-you.herokuapp.com/api/all-posts/`)
//   const posts = await res.json()
//   return {
//     props : {posts}
//   }

// }
// async function onSearch(word){
//   console.log(word)
//   const res = await fetch(`https://blogged-for-you.herokuapp.com/api/all-posts/?search=${word}`)
//   const posts = await res.json()
//  // setPosts(posts)

// }
