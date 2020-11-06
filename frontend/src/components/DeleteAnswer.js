import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteAnswer } from '../actions/index'

class DeleteAnswer extends Component {

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.deleteAnswer(this.props.id);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
        <button onClick = {() => {deleteAnswer(this.props.id)}}>delete Answer</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { deleteAnswer })(DeleteAnswer)