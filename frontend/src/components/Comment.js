import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../actions/index';

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
      }
    }
  }

  handleOnChange = e => {
    if (e.target.name === 'comment') {
      this.setState({ newComment :{
        ...this.state.newComment ,comment: e.target.value} });
  
    } 
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.createComment(this.state.newComment)
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>

        <label>add comment</label>
        <input
          type="text"
          name="comment"
          value={this.state.newComment.comment}
          onChange={this.handleOnChange}
        />
        <button> Comment </button>
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

export default connect(mapStateToProps, {createComment})(Comment);