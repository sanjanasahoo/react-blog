import router from 'next/router'
import formStyle from '../styles/PostForm.module.css'
export default function Create() {
    const onSubmit=async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('title' , e.target.title.value) 
        formData.append('content' , e.target.content.value) 
        formData.append('cover' ,e.target.img.files[0]) 
        const token = JSON.parse(localStorage.getItem('token'))
        const requestOptions ={
            method :'POST',
            body :formData,
            headers: {                
                'Authorization': token,
              }
        }
        const newPostRes = await fetch('https://blogged-for-you.herokuapp.com/api/posts/',requestOptions)
        const newPost = await newPostRes.json()
        router.push(`/post/${newPost.id}`)
    }
    return (
        <div className={formStyle.postFormDiv}>
            <h1>Add Post</h1>
            <form className={formStyle.postForm} onSubmit={onSubmit}>
                <div><input type="file" name="img" accept="image/*" /></div>
                <div className={formStyle.formInputDiv}>
                    <label htmlFor="addpost-title">Title</label>
                    <input type="text" className={formStyle.title} 
                     name="title" required/>
                </div>
                <div className={formStyle.textDiv}>
                    <label htmlFor="addpost-content">Content</label>
                    <textarea className={formStyle.textareaInput} 
                    name="content" required></textarea>
                </div>
                <div className={formStyle.formButtonDiv}>
                    <input type="submit" value="Save"/>
                </div>
            </form>
        </div>
    )
}