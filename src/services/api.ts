import axios from "axios";
import { NewPost } from "../components/CreateNewPost";
import { PostId, PostProps } from "../components/Post";

export const getAllPost= async ()=>{
    return  axios.get("http://localhost:4000/post")
}
export const createNewPost= async (post:NewPost)=>{
    return  axios.post("http://localhost:4000/post",post)
}

export const deletePost= async ({id}:PostId)=>{
    return  axios.delete(`http://localhost:4000/post/${id}`)
}
export const updatePostHandler= async ({id,title,description}:PostProps)=>{
    return  axios.patch(`http://localhost:4000/post/${id}`,{title,body:description})
}

export const searchApiHandler= async (query:string | null)=>{
    return  axios.get(`http://localhost:4000/post?title_like=${query}`)
}