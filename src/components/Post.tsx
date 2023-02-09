import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/system'
import React from 'react'
import {useState,useEffect} from 'react'
import { useAppDispatch } from '../Redux/App/hooks'
import { setDeletePostId, setSinglePost } from '../Redux/features/postFeature/postSlice'
import { deletePost } from '../services/api'
import EditPostModal from './EditPostModal'
export type PostProps ={
  id:number,
    title:string,
    description:string
}
 export type PostId={
  id:number
}

export default function Post({title,description,id}:PostProps) {
  const [singlePost,setsinglePost]=useState<PostProps >({} as PostProps);
  const dispatch= useAppDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(setSinglePost(null))
    setOpen(false);
  };

  const  handleclick=()=>{
     console.log()
  }
 
  return (
    <>
    <Paper  sx={{ height:'300px' , border:"2px solid red"}}>
        <Typography variant='h5' sx={{fontWeight:"600"}} p={2}>{title}</Typography>
         <Box mb={2} p={2}>
            {description}
         </Box>
         <Stack direction={'row'} spacing={2} ml={1}>
          <Button variant='contained' color='error' onClick={(e)=>{
            dispatch(setDeletePostId(id))
         }}>Delete</Button>
         <Button variant='contained' color='success' onClick={(e)=>{
         // e.preventDefault()
         setSinglePost({id,title,body:description})
          setOpen(true)
         }}>Edit</Button>
         </Stack>
    </Paper>
    <EditPostModal open={open} handleClose={handleClose} singlePost={{id,title,description}}/>
    </>
  )
}
