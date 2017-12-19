import React from 'react'

const Content = (props) => {
  return (
    <div className='content-container'>
      <div className='content'>
        <h3>{props.content.title}</h3>
        <h3>{props.content.url}</h3>
        <p>{props.content.description}</p>
      </div>

      {props.auth
        ? <div className='icon'>
          <span className='edit' onClick={() => props.setEditing(props.content.id)}><i className='fa fa-pencil fa-fw fa-lg cursor' /></span>
          <span className='delete' onClick={() => props.deleteContent(props.content.id)}><i className='fa fa-trash fa-fw fa-lg cursor' /></span>
        </div>
        : ''}

    </div>

  )
}

export default Content
