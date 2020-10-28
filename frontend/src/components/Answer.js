import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAnswer } from '../actions/index';

class Answer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        newAnswer:{
          id: "",
            question: this.props.id,
            user: "",
            content: "",
            answered_date: "",
            likes_count: "",
            dislikes_count: "",
            comments_count: "",
            comments: [
                {
                    id: "",
                    comment: "",
                    created_on: "",
                    user: "",
                    answer: ""
                }
            ],
            vote: []
        }
    }
  }

  handleOnChange = e => {
    if (e.target.name === 'content') {
      this.setState({ newAnswer :{
        ...this.state.newAnswer ,content: e.target.value} });
  
    } 
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.createAnswer(this.state.newAnswer)
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>

        <label>answer</label>
        <input
          type="text"
          name="content"
          value={this.state.newAnswer.content}
          onChange={this.handleOnChange}
        />
        <button >Answer</button>
      </form>
    );
  }
}

const mapStateToProps = ({ authlogin, answerreducer  }) => {
  return { 
      authlogin,
      answerreducer
  }
}

export default connect(mapStateToProps, {createAnswer})(Answer);