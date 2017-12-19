import React, { Component } from 'react'
import Content from './Content'
import ContentForm from './ContentForm'

const fetch = window.fetch

class ContentList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: [],
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
       console.log(res)
       this.setState({
         content: res.data,
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
      return this.state.content.map(content => {
        return <ContentForm content={content} handleFormSubmit={this.handleFormSubmit} isAdd={false} key={content.id} />
      })
    } else return <p>Loading...</p>
  }

  render () {
    return (
      <div className='contentList'>
        {this.state.auth
          ? <ContentForm isAdd handleFormSubmit={this.handleFormSubmit} />
          : ''}
        {this.renderContentList()}
      </div>
    )
  }
}

export default ContentList
