import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteAnswer, getQuestions } from '../actions/index'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


class DeleteAnswer extends Component {
  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.deleteAnswer(this.props.id, ()=>{ this.props.getQuestions() });
  }

  render() {
    return (
        <form onSubmit={this.handleOnSubmit}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick = {this.handleOnSubmit}
            style={{marginRight:"10px" ,cursor: "pointer"}} 
          >
            delete Answer
          </Button>
        </form>
    )
  }
}

export default connect(null, { deleteAnswer, getQuestions })(DeleteAnswer)