import React, { Component } from 'react'
import { connect } from 'react-redux'
import {deletecomment ,getQuestions} from '../actions/index'
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
class DeleteComment extends Component {

  handleOnSubmit =  event => {
    event.preventDefault()
    this.props.deletecomment(this.props.id);
    this.props.getQuestions()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
        <Button
        variant="contained"
        color="primary"
        startIcon={<DeleteIcon />}
        onClick = {() => {deletecomment(this.props.id)}}>
          delete comment
        </Button>
        </form>
      </div>
    )
  }
}

export default connect(null, {deletecomment,getQuestions})(DeleteComment)