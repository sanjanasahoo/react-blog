import { useEffect, useState } from "react"
import Select from 'react-select'
import formStyle from '../styles/Form.module.css'
const Search = ({onSearch,selectdata,data}) => {
    const [keyword ,setKeyword] = useState('')
    const [selectOptions,setSelect] = useState({value:'',label:'Select Author'})
    const [sortBy,setSortBy] = useState(false)
    const options = selectdata.map(d => ({
        "value" : d.id,
        "label" : d.name
      }))
    const onSelectChange = (e)=>{
        setSelect({value:e.value,label:e.label})
    }
    const onToggleSort =(e)=>{
        e.preventDefault()
        setSortBy((prevsort)=>!prevsort)
        if(sortBy){
            e.target.innerText ="Oldest"
        }
        else  e.target.innerText ="Newest"
    }
    const onSubmit =(e)=>{
        e.preventDefault()
        onSearch(keyword,selectOptions,!sortBy)
        setKeyword('')
        setSelect({label:'',value:''})
    }
    useEffect(()=>{
        const button = document.getElementById('sort')
        if(data.sort) {
            button.innerHTML='Oldest'
            setSortBy(true)
        }
        setKeyword(data.word)
        setSelect({value:data.selected.selectedId,label:data.selected.name})
    },[data])
    const customStyles = {
        container :(provided)=>({
            ...provided,
            width :'30%'
        }),
    }
    return (
        <div className={formStyle.searchFormDiv}>
        <form className={formStyle.searchForm} onSubmit={onSubmit}>
            <Select styles={customStyles}
            options={options} 
            onChange ={onSelectChange} 
            value={selectOptions}
            />
            <input className ={formStyle.searchBox} type="text" name="keyword" value={keyword} placeholder="Search" onChange={(e)=>{setKeyword(e.target.value)}}></input>
            <div ><button id ="sort" className ={formStyle.submitInput} onClick={onToggleSort}>Newest</button></div>
            <input className='button' type="submit" value="Search"/>
        </form>
        </div>
    )
}

export default Search

