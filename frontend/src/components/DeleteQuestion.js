import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteQuestion ,getQuestions} from '../actions/index'

class DeleteQuestion extends Component {

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.deleteQuestion(this.props.id);
    this.props.getQuestions()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
        <button onClick = {() => {deleteQuestion(this.props.id)}}>delete Question</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { deleteQuestion,getQuestions})(DeleteQuestion)