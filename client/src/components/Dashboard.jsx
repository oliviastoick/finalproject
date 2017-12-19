import React from 'react'
import ContentList from './ContentList'
import ContentForm from './ContentForm'

const Dashboard = (props) => {
  return (
    <div className='dash'>
      <h1>Hello {props.user.username}!</h1>
      <ContentForm />
      <ContentList />
    </div>
  )
}

export default Dashboard
