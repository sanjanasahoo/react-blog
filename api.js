export async function fetchAPIPost(id){
    const res = await fetch(`${process.env.API_REG_USER_URL}${id}`, {
        method: 'GET'
    })
    const result = await res.json()
    return result
}
export async function putPostData(requestOptions,id){
    const updatedPostRes = await fetch(`${process.env.API_REG_USER_URL}${id}`, requestOptions)
    const updatedPost = await updatedPostRes.json()
    return updatedPost
}
export async function getAllAPIPosts(){
    const postsRes = await fetch(`${process.env. API_UNREG_USER_URL}`)
    const posts = await postsRes.json()
    return posts
}
export async function getAllAuthors(){
    const res = await fetch(process.env.API_AUTHORS_URL)
    const authors = await res.json()
    return authors
}