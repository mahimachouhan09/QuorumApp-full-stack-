import React, { Component } from 'react'
import { connect } from 'react-redux'
import {deletecomment ,getQuestions} from '../actions/index'

class DeleteComment extends Component {
  constructor(props){
    super(props)
  }

  handleOnSubmit =  event => {
    event.preventDefault()
    this.props.deletecomment(this.props.id);
    this.props.getQuestions()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
        <button onClick = {() => {deletecomment(this.props.id)}}>delete comment</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {deletecomment,getQuestions})(DeleteComment)