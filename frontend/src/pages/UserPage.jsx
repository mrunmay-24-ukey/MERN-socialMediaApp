import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
      <UserHeader/>
      <UserPost likes={2200} replies={481} postImg='/post1.png' postTitle='Lets talk about threads' />
      <UserPost likes={100} replies={50} postImg='/post2.png' postTitle='Nice Tutorial'/>
      <UserPost likes={4200} replies={800} postImg='/post3.png' postTitle='loving it'/>
      <UserPost likes={2000} replies={500} postImg='/post4.png' postTitle='First thread'/>
    </>
  )
}

export default UserPage