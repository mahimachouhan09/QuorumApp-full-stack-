import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteQuestion ,getQuestions} from '../actions/index'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteQuestion extends Component {

  handleOnSubmit = async(event) => {
    event.preventDefault()
    await this.props.deleteQuestion(this.props.id);
    await this.props.getQuestions()
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <Button variant="contained" color="primary" startIcon={<DeleteIcon />} onClick = {this.handleOnSubmit}>
          delete Question
        </Button>
      </form>
    )
  }
}

const mapStateToProps = ({ questionsreducer  }) => {
  return { 
    questionsreducer
  }
}

export default connect(mapStateToProps , { deleteQuestion,getQuestions})(DeleteQuestion)