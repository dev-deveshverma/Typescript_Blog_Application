import { Button, Paper, TextField, Typography } from '@mui/material'
import {useState} from 'react'
import React from 'react' 
import { createNewPost } from '../services/api';
import { useNavigate } from 'react-router-dom';
 export type NewPost={
    title:string,
    body:string,
}

export default function CreateNewPost() {
    const [newPost,setNewPost]= useState<NewPost>({} as NewPost);
    const navigate=useNavigate()
      console.log('new post input',newPost)
   return (
    <>
    <Paper sx={{width:'600px',height:'300px', margin:'auto',marginTop:'5rem', display:'flex',flexDirection:'column', gap:'2rem',padding:'1rem'}}>
        <Typography align='center' variant='h5'>Create New Post</Typography>
    <TextField placeholder='post title' name='title' onChange={(e)=>{
         setNewPost({...newPost, title:e.target.value})
    }}/>
     <TextField placeholder='post description' name='title' onChange={(e)=>{
         setNewPost({...newPost, body:e.target.value})
    }}/>
    <Button variant='contained' color='success' onClick={()=>{
             createNewPost(newPost).then((post)=>{
                navigate('/')
                console.log('post created',post)
             }).catch((error)=>{
                console.log('post creation error',error)
             })
    }}>Submit</Button>
    </Paper>
    </>
  )
}
