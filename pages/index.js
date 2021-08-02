
import PostList from '../components/PostList'
import Search from '../components/Search'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Nav from '../components/Nav'
import Header from '../components/Header'
import { toast } from 'react-toastify';
import { getAllAPIPosts, putPostData ,getAllAuthors} from '../api'
const fetcher = url => fetch(url).then(r => r.json())

export default function Home({ authors, posts }) {

  const [token, setToken] = useState(null)
  const [searchData, setData] = useState({ word: '', selected: { selectedId: '', name: '' }, sort: false })
  const [url, setUrl] = useState(`${process.env.API_UNREG_USER_URL}?sort=newest`)
  const [reqId, setReqId] = useState('')
  const [reqHeader, setReqHeader] = useState('')
  function onSearch(word, selected, sort) {
    let sortBy = sort ? 'oldest' : 'newest'
    setUrl(`${process.env.API_UNREG_USER_URL}` + `?sort=${sortBy}` + `&author=${selected.label}` + `&search=${word}`)
    setData({ word, selected: { selectedId: selected.value, name: selected.label }, sort })
  }
  function onDelete(id) {
    setReqId(id)
    setReqHeader({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },

    })
  }


  const { data, mutate, error } = useSWR(url, fetcher, { posts })
  useEffect(() => {
    const fetchData = async () => {
      setToken(JSON.parse(localStorage.getItem('token')))
      if (!token || reqHeader == '') {
        return
      }
      reqHeader.headers.Authorization = token
      const deletedPost = await putPostData(reqHeader, reqId)
      if (deletedPost.errors) toast.error(deletedPost.errors[0].message)
      else {
        toast.success("Post deleted Successfully")
        mutate()
      }

    }

    fetchData()
  }, [reqHeader, token, mutate, reqId]
  );

  if (!data) return <div>Loading...</div>
  return (
    <>
      <Header />
      <Nav />
      <Search onSearch={onSearch} selectdata={authors} data={searchData} />
      <PostList posts={data} onDelete={onDelete} />
    </>
  )
}
export async function getServerSideProps() {
  const posts = await getAllAPIPosts()
  const authors = await getAllAuthors()
  return {
    props: { authors, posts }
  }
}


