import { Button, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/App/hooks'
import { updatePostState } from '../Redux/features/postFeature/postSlice'
import { getAllPost, updatePostHandler } from '../services/api'
import { PostProps } from './Post'
type EditPostModalProps={
 open: boolean,
 handleClose:()=>void,
 singlePost:UpdatePostState
}
type UpdatePostState={
   id:number,
   title:string | ""
   description:string | ""
}

export default function EditPostModal({open,handleClose,singlePost} :EditPostModalProps) {
 // const {singlePost}= useAppSelector((store)=>store.postReducer);
  const dispatch= useAppDispatch()
  const [updatePost,setUpdatePost]= useState({
      id:singlePost.id || 0,
      title:singlePost.title || '',
      body:singlePost.description || ''
  } )
  console.log('singlePost',singlePost)
  console.log('update post state',updatePost)
  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Paper   sx={{width:'600px',height:'200px',margin:"auto",marginTop:'2rem',padding:'2rem'}}>
           <form >
          <Box sx={{ width:'100%', height:'auto',display:'flex',justifyContent:'space-around', flexDirection:'column', gap:'10px'}}>
          <TextField placeholder='title' value={updatePost?.title} onChange={(e)=>{
            setUpdatePost({...updatePost,title:e.target.value})
          }}/>
            <TextField placeholder='body' value={updatePost?.body}  onChange={(e)=>{
            setUpdatePost({...updatePost,body:e.target.value})
          }}/>
          </Box>

           </form>
          <Stack direction={'row'} spacing={2} mt={3} ml='auto'>
          <Button variant='contained' color='success' onClick={(e)=>{
           // dispatch(setDeletePostId(id))
           const {id, title, body} = updatePost
           updatePostHandler({id,title,description:body}).then((res)=>{
             if(res.data){
              getAllPost().then((res)=>{
                dispatch(updatePostState(res.data))
                console.log('result', res)
             }).catch((err)=>{
                console.log('error', err)
             })
             }
            handleClose()
            
           }).catch((err)=>{
            console.log('error updating post',err)
            handleClose()
           })
         }}>Update</Button>
         <Button variant='contained' color='error' onClick={(e)=>{
          //setOpen(true)
           // dispatch(setSinglePost({id,title,body:description}))
      
          //  setUpdatePost({  id:singlePost?.id || 0,
          //   title:singlePost?.title || '',
          //   body:singlePost?.body || ''})
           handleClose()
         }}>Cancel</Button>
         </Stack>
        </Paper>

      </Modal>
   
    </>
  )
}
