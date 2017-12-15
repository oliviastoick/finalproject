import React, { Component } from 'react'

class ContentList extends Component {
  constructor () {
    super ()
    this.state = {
      content: null,
      dataLoaded: false
    }
  }

  componentDidMount () {
    fetch('/content')
    .then(res => res.json())
    .then(res => {
      this.setState({
        content: res.data.content,
        dataLoaded: true
      })
    }).catch(err => console.log(err))
  }

  renderContentList () {
    if (this.state.dataLoaded) {
      retrun <h1>Info will go here!</h1>
    } else return <p>Loading...</p>
  }

  render () {
    return (
      <div className="contentList">
        {this.renderContentList()}
      </div>
    )
  }
}

export default ContentList
