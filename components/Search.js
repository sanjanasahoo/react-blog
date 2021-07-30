import { useState } from "react"
import Select from 'react-select'
import formStyle from '../styles/Form.module.css'
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
    }
    const onSubmit =(e)=>{
        e.preventDefault()
        setShouldFetch(true)
        onSearch(keyword,selectOptions,sortBy?'oldest':'newest')
        setKeyword('')
        
    }
    const customStyles = {
        container :(provided)=>({
            ...provided,
            width :'30%'
        }),
    }
    return (
        <div className={formStyle.searchFormDiv}>
        <form className={formStyle.searchForm} onSubmit={onSubmit}>
            <Select styles={customStyles}options={options} onChange ={onSelectChange}/>
            <input className ={formStyle.searchBox} type="text" name="keyword" value={keyword} placeholder="Search" onChange={(e)=>{setKeyword(e.target.value)}}></input>
            {/* <div ><button className ={formStyle.submitInput} onClick={onToggleSort}>Newest</button></div> */}
            <input className='button' type="submit" value="Search"/>
        </form>
        </div>
    )
}

export default Search

