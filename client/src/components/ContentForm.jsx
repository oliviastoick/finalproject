import React, { Component } from 'react'

class ContentForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.content ? props.content.title : '',
      url: props.content ? props.content.url : '',
      description: props.content ? props.content.description : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit (method, e, data, id) {
    e.preventDefault()
    this.setState({
      title: '',
      url: '',
      description: ''
    })
    this.props.handleFormSubmit(method, data, id)
  }

  render () {
    return (
      <form onSubmit={(
        this.props.isAdd
          ? (e) => this.props.handleFormSubmit('POST', e, this.state)
          : (e) => this.props.handleFormSubmit('PUT', e, this.state, this.props.content.id)
      )}>
        <input type='text' name='title' placeholder='title' value={this.state.title} onChange={this.handleChange} />
        <input type='text' name='description' placeholder='description' value={this.state.description} onChange={this.handleChange} />
        <input type='url' name='url' placeholder='img' value={this.state.genre} onChange={this.handleChange} />
      </form>
    )
  }
}

export default ContentForm
