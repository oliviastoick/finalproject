import React from 'react'

const Content = (props) => {
  return (
    <div className='content'>
      <h3>{props.content.title}</h3>
      <h3>{props.content.url}</h3>
      <p>{props.content.description}</p>
      {props.auth
        ? <span className='edit' onClick={() => props.setEditing(props.content.id)}>Edit</span>
        : ''}
    </div>
  )
}

export default Content
