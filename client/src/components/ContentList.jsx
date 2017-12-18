import React, { Component } from 'react'
import Content from '/Content'
import ContentForm from '/ContentForm'

class ContentList extends Component {
  constructor () {
    super()
    this.state = {
      content: null,
      dataLoaded: false
    }
  }

  componentDidMount () {
    this.getAllMovies()
  }

  getAllMovies () {
    fetch('/content', { credentials: 'include' })
     .then(res => res.json())
     .then(res => {
       this.setState({
         content: res.data.movies,
         dataLoaded: true
       })
     }).catch(err => console.log(err))
  }

  handleFormSubmit (method, e, data, id) {
    e.preventDefault()
    fetch(`/content/${id || ''}`, {
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
       this.getAllContent()
     }).catch(err => console.log(err))
  }

  renderContentList () {
    if (this.state.dataLoaded) {
      return this.state.content.map(content => {
        return <Content key={content.id} content={content} />
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
