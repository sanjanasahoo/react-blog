import { useState } from "react"
import PostList from "./PostList"

const Search = ({onSearch}) => {
    const [keyword ,setKeyword] = useState('')
    const [shouldFetch,setShouldFetch] = useState(false)
    const onSubmit =(e)=>{
        e.preventDefault()
        if(!keyword){
            alert('Please enter keyword')
            return
        }
        setShouldFetch(true)
        onSearch(shouldFetch,keyword)
        setKeyword('')
        
    }
    // const { data, error } = useSWR(!shouldFetch?null:`https://blogged-for-you.herokuapp.com/api/all-posts/?search=${keyword}`, fetcher)
    // if(data){
    // setShouldFetch(false)
    // setKeyword('')
    // onSearch({data})
    // console.log(data)
    
    
    

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="keyword" value={keyword} placeholder="Search" onChange={(e)=>{setKeyword(e.target.value)}}></input>
            <input type="submit" vaue="Search"/>
        </form>
    )
}

export default Search
