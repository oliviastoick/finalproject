import React from 'react'

const Content = (props) => {
  return (
    <div className='content'>
      <h3>{props.content.title}</h3>
      <h3>{props.content.genre}</h3>
      <p>{props.content.description}</p>
    </div>
  )
}

export default Content
