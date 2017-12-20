import React from 'react'
import ContentList from './ContentList'

const Dashboard = (props) => {
  return (
    <div className='dash'>
      <h1>Hello {props.user.username}!</h1>
      <ContentList />
    </div>
  )
}

export default Dashboard
