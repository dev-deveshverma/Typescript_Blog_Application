import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import CreateNewPost from '../components/CreateNewPost'
import DetailPost from '../components/DetailPost'
import Home from '../components/Home'

export default function AllRoutes() {
  return (
    <>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create-new-post' element={<CreateNewPost/>}/>
        <Route path="/details:id" element={<DetailPost/>}/>
     </Routes>
    </>
  )
}
