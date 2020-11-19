import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteAnswer } from '../actions/index'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


class DeleteAnswer extends Component {
  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.deleteAnswer(this.props.id);
  }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default connect(null, { deleteAnswer })(DeleteAnswer)