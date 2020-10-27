import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAnswer } from '../actions/index';

class AskQuestion extends Component {
  constructor() {
      super();
      this.state = {
        newAnswer:{
          id: "",
            question: "",
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
    if (e.target.name === 'question') {
      this.setState({newAnswer :{
        ...this.state.newAnswer ,question: e.target.value} });

    } else if (e.target.name === 'content') {
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
        <label>question</label>
        <input
          type="text"
          name="question"
          value={this.state.newAnswer.question}
          onChange={this.handleOnChange}
        />
        <label>answer</label>
        <input
          type="text"
          name="content"
          value={this.state.newAnswer.content}
          onChange={this.handleOnChange}
        />
        <button>Answer</button>
      </form>
    );
  }
}

export default connect(null, {createAnswer})(AskQuestion);