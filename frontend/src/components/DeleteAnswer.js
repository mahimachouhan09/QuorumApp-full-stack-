import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteAnswer, getQuestions } from '../actions/index'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


class DeleteAnswer extends Component {
  handleOnSubmit = async(event) => {
    event.preventDefault()
    await this.props.deleteAnswer(this.props.id);
    await this.props.getQuestions()
  }

  render() {
    return (
        <form onSubmit={this.handleOnSubmit}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick = {this.handleOnSubmit}
          >
            delete Answer
          </Button>
        </form>
    )
  }
}

export default withRouter(connect(null, { deleteAnswer, getQuestions })(DeleteAnswer))