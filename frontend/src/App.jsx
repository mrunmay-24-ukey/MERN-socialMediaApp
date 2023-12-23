import React from 'react'
import {Button} from '@chakra-ui/button'
import { Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import Header from './components/Header'
import PostPage from './pages/PostPage'



const App = () => {
  return (
    <Container maxW="620px">
        <Header/>
        <Routes>
            <Route path='/:username' element={<UserPage/>}></Route>
            <Route path='/:username/post/:pid' element={<PostPage/>}></Route>
        </Routes>

    </Container>
    
  )
}

export default App