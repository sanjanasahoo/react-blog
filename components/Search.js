import { useState } from "react"
import Select from 'react-select'

const Search = ({onSearch,selectdata}) => {
    const [keyword ,setKeyword] = useState('')
    const [shouldFetch,setShouldFetch] = useState(false)
    const [selectOptions,setSelect] = useState({id:'',name:''})
    const [sortBy,setSortBy] = useState(false)
    const options = selectdata.map(d => ({
        "value" : d.id,
        "label" : d.name
      }))
    const onSelectChange = (e)=>{
        setSelect({id:e.value,name:e.label})
    }
    const onToggleSort =(e)=>{
        e.preventDefault()
        setSortBy(sortBy=>!sortBy)
        if(sortBy){
            e.target.innerText ="Oldest"

        }
        else  e.target.innerText ="New"
        

        console.log(sortBy)
    }
    const onSubmit =(e)=>{
        e.preventDefault()
        setShouldFetch(true)
        onSearch(keyword,selectOptions,sortBy?'oldest':'newest')
        setKeyword('')
        
    }
    return (
        <form onSubmit={onSubmit}>
            <Select options={options} onChange ={onSelectChange}/>
            <input type="text" name="keyword" value={keyword} placeholder="Search" onChange={(e)=>{setKeyword(e.target.value)}}></input>
            <div style={{padding:'10px'}} ><button onClick={onToggleSort}>Newest</button></div>
            <input style={{padding:'10px'}}type="submit" value="Search"/>
        </form>
    )
}

export default Search

