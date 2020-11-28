import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment, getQuestions } from '../actions/index';
import { Button } from '@material-ui/core';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment:{
        id: "",
        comment: "",
        created_on: "",
        user: "",
        answer: this.props.answerId
      },
      showForm: false
    }
  }

  handleOnChange = e => {
    if (e.target.name === 'comment') {
      this.setState({ newComment :{
        ...this.state.newComment ,comment: e.target.value} });
  
    } 
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.createComment(this.state.newComment,()=>{this.props.getQuestions()})
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div>
        <label>comment</label>
        <input
          type="text"
          name="comment"
          value={this.state.newComment.comment}
          onChange={this.handleOnChange}
        />
        <Button variant="contained" color="secondary" onClick= {this.handleOnSubmit}> Comment </Button>
      </div>
      </form>
    );
  }
}

const mapStateToProps = ({ authlogin, answerreducer ,commentreducer }) => {
  return { 
      authlogin,
      answerreducer,
      commentreducer
  }
}

export default connect(mapStateToProps, {createComment, getQuestions})(Comment);