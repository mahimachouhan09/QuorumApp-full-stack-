import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAnswer, getQuestions } from '../actions/index';
import { Button } from '@material-ui/core';

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
        }
    }
  }

  handleOnChange = e => {
    if (e.target.name === 'content') {
      this.setState({ newAnswer :{
        ...this.state.newAnswer ,content: e.target.value} });
  
    } 
  }

  handleOnSubmit = async(event) => {
    event.preventDefault()
    await this.props.createAnswer(this.state.newAnswer)
    await this.props.getQuestions()
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
        <Button variant="contained" color="secondary" onClick= {this.handleOnSubmit} >Answer</Button>
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

export default connect(mapStateToProps, {createAnswer, getQuestions})(Answer);