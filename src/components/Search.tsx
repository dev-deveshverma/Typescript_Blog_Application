import * as React from 'react';
import {useState} from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../Redux/App/hooks';
import { getAllPost, searchApiHandler } from '../services/api';
import { updatePostState } from '../Redux/features/postFeature/postSlice';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';

export default function Search() {
    const { post} = useAppSelector(store=>store.postReducer);
    const dispatch=useAppDispatch()
    const [searchInput,setSearchInput] =useState<string | null>(null);
    const searchHanlder= async()=>{
      
        try {
            if(searchInput?.length){
             const searchResult= await searchApiHandler(searchInput);
             console.log('searchResult', searchResult)
               dispatch(updatePostState(searchResult.data));
               return 
            }
            //resetting search store state
            const allPost = await getAllPost();
            dispatch(updatePostState(allPost.data))

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 1px', display: 'flex', alignItems: 'center', width:{xs:200,sm:400,md:400},margin:'auto',marginTop:'7rem'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search post "
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e)=>{
            setSearchInput(e.target.value)
        }}
      />
      <Button variant='contained' type='submit' onClick={(e)=>{
          e.preventDefault()
        searchHanlder()}}>Search</Button>

    </Paper>
  );
}
