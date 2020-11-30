import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {deletecomment ,getQuestions} from '../actions/index'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteComment extends Component {

  handleOnSubmit =  (event) => {
    event.preventDefault()
    this.props.deletecomment(this.props.id,()=>{this.props.getQuestions()});
  }

  render() {
    return (
      <Fragment>
          <form onSubmit={this.handleOnSubmit}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
              onClick = {this.handleOnSubmit}
              style={{marginRight:"10px" ,cursor: "pointer"}} 
            >
            delete comment
            </Button>
          </form>
      </Fragment>
    )
  }
}

export default connect(null, {deletecomment,getQuestions})(DeleteComment)