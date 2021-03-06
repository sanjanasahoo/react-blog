import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import formStyle from '../styles/PostForm.module.css'
import {fetchAPIPost, putPostData} from '../api'
export default function Create() {
    console.log(process.env.REG_USERS_POST_URL)
    const { query } = useRouter()
    const [postData, setPostData] = useState(null)
    const [hasQuery, setQuery] = useState(false)
    useEffect(() => {
        async function fetchData() {
            if (query.id) {
                const postData = await fetchAPIPost(query.id)
                setPostData(postData)
                setQuery(true)
            }
        }
        fetchData()
    },[query.id])
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', e.target.title.value)
        formData.append('content', e.target.content.value)
        formData.append('cover', e.target.img.files[0])
        const token = JSON.parse(localStorage.getItem('token'))
        let url = process.env.API_REG_USER_URL
        let requestOptions = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': token,
            }
        }
        if (!hasQuery) {
            const newPostRes = await fetch(url, requestOptions)
            const newPost = await newPostRes.json()
            if (newPost.errors) toast.error(newPost.errors[0].message)
            else {
                toast.success("Post created Successfully")
                router.push(`/post/${newPost.id}`)
            }
        }
        else {
            let newRequestOptions = { ...requestOptions, method: 'PUT' }
            const updatedPost = await  putPostData(newRequestOptions,query.id)
            if (updatedPost.errors) toast.error(newPost.errors[0].message)
            else {
                toast.success("Post updated Successfully")
                router.push(`/post/${query.id}`)
            }
            
        }
    }
    return (
        <div className={formStyle.postFormDiv}>
            <h1><span>{hasQuery ? 'Update' : 'Add'}</span> Post</h1>
            <form className={formStyle.postForm} onSubmit={onSubmit}>
                <div style={!hasQuery ? { 'display': 'block' } : { 'display': 'none' }}><input type="file" name="img" accept="image/*" required={!hasQuery} /></div>
                <div className={formStyle.formInputDiv}>
                    <label htmlFor="addpost-title">Title</label>
                    <input type="text" className={formStyle.title}
                        name="title" defaultValue={hasQuery ? postData.title : ''} required />
                </div>
                <div className={formStyle.textDiv}>
                    <label htmlFor="addpost-content">Content</label>
                    <textarea className={formStyle.textareaInput}
                        name="content" defaultValue={hasQuery ? postData.content : ''} required></textarea>
                </div>
                <div className={formStyle.formButtonDiv}>
                    <input type="submit" value="Save" />
                </div>
            </form>
        </div>
    )
}