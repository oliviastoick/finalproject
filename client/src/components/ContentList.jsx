import React, { Component } from 'react'
// import Content from './Content'
import ContentForm from './ContentForm'
// import Content from './Content'

const fetch = window.fetch

class ContentList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: null,
      dataLoaded: false,
      auth: props.auth,
      currentlyEditing: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.deleteContent = this.deleteContent.bind(this)
    this.setEditing = this.setEditing.bind(this)
    this.getAllContent = this.getAllContent.bind(this)
  }

  componentDidMount () {
    this.getAllContent()
  }

  getAllContent () {
    fetch('/api/content', { credentials: 'include' })
     .then(res => res.json())
     .then(res => {
       console.log(res.data)
       this.setState({
         content: res.data.content,
         dataLoaded: true
       })
     }).catch(err => console.log(err))
  }

  handleFormSubmit (method, e, data, id) {
    e.preventDefault()
    fetch(`api/content/${id || ''}`, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
     .then(res => res.json())
     .then(res => {
       console.log(res)
       this.setState({
         currentlyEditing: null
       })
       this.getAllContent()
     }).catch(err => console.log(err))
  }

  setEditing (id) {
    this.setState({
      currentlyEditing: id
    })
  }

  deleteContent (id) {
    fetch(`/api/content/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        this.getAllContent()
      }).catch(err => console.log(err)
    )
  }

  renderContentList () {
    if (this.state.dataLoaded) {
      console.log(this, 'this is from rendercontentlist')
      return this.state.content.map(content => {
        return (
          <div>
            {/* <ContentForm content={content} handleFormSubmit={this.handleFormSubmit} isAdd={false} key={content.id} /> */}
            <h1>{content.title}</h1>
            <h4>{content.description}</h4>
            <img src={content.url} width="400px"/>
            <br/>
            <button className='edit' onClick={() => this.setEditing(content.id)}>edit</button>
            <button className='delete' onClick={() => this.deleteContent(content.id)}>delete</button>
            {/* {this.auth
              ? <div className='icon'>
                <button className='edit' onClick={() => this.setEditing(content.id)}>edit</button>
                <button className='delete' onClick={() => this.deleteContent(content.id)}>delete</button>
              </div>
              : ''} */}
          </div>
        )
      })
    } else return <p>Loading...</p>
  }

  render () {
    return (
      <div className='contentList'>

          <ContentForm handleFormSubmit={this.handleFormSubmit} getAllContent={this.getAllContent} />

        {this.renderContentList()}

      </div>
    )
  }
}

export default ContentList
