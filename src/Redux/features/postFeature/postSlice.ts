import {createSlice,PayloadAction} from '@reduxjs/toolkit'
//? post type 
type Post ={
    userId?:number,
    id:number,
    title:string,
    body:string,
}

//? initial state type
type InitialState ={
    post:Post[],
    deletePostId:number | null,
    singlePost: Post | null
}

const initialState:InitialState = {
     post: [],
     deletePostId:null,
     singlePost: null
}

const postSlice= createSlice({
    name: 'post',
    initialState,
    reducers:{
        updatePostState:(state,action:PayloadAction<Post[]>)=>{
            state.post = action.payload
        },
        setDeletePostId:(state,action:PayloadAction<number | null>)=>{
            state.deletePostId = action.payload
        },
        setSinglePost:(state,action:PayloadAction<Post | null>)=>{
            state.singlePost = action.payload
        }
    }
})

export const {updatePostState,setDeletePostId,setSinglePost} = postSlice.actions
export default postSlice.reducer