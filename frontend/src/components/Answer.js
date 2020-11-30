import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
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
        },
        showForm: false
    }
  }

  handleOnChange = e => {
    if (e.target.name === 'content') {
      this.setState({ newAnswer :{
        ...this.state.newAnswer ,content: e.target.value} });
    } 
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.createAnswer(this.state.newAnswer,()=>{this.props.getQuestions()})
    this.setState({ showForm: false})
  }

  showForm = () => {
    return (
      <form className="answer-text" onSubmit={this.handleOnSubmit}>
      <input
        type="text"
        name="content"
        value={this.state.newAnswer.content}
        onChange={this.handleOnChange}
      />
      <Button variant="contained" color="primary" onClick= {this.handleOnSubmit}>
        Answer</Button>
    </form>
    );
  }
  
  render() {
    return (     
      <div>  
        <Button type="button" variant="contained" color="primary" style={{display:"flex"}}
          onClick={() => this.setState({ showForm: true })}>
          Answer
        </Button>  
        {this.state.showForm ? this.showForm() : null}
      </div>
    );
  }
}

const mapStateToProps = ({ authlogin, answerreducer  }) => {
  return { 
    authlogin,
    answerreducer
  }
}

export default withRouter(connect(mapStateToProps, {createAnswer, getQuestions})(Answer));