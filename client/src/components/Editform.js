import React, { Component } from 'react'

class Editform extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.content ? props.content.title : '',
      url: props.content ? props.content.url : '',
      description: props.content ? props.content.description : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit (e, id) {
    e.preventDefault()
    fetch(`/api/content/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
   .then(res => res.json())
   .then(res => {
     console.log(res)
     return res
   }).catch(err => console.log(err))
  }
  // editContent (id) {
  //   fetch(`/api/content/${id}`, {
  //     method: 'PUT',
  //     credentials: 'include'
  //   }).then(res => res.json())
  //     .then(res => {
  //       console.log(res)
  //     }).catch(err => console.log(err)
  //   )
  // }

  render () {
    return (
      <form onSubmit={this.handleFormSubmit(e,this.state)}>
        <input type='text' name='title' placeholder='title' value={this.state.title} onChange={this.handleChange} />
        <input type='text' name='description' placeholder='description' value={this.state.description} onChange={this.handleChange} />
        <input type='url' name='url' placeholder='img' value={this.state.genre} onChange={this.handleChange} />

        <input type='submit' value='Submit' />

      </form>
    )
  }
}

export default ContentForm
