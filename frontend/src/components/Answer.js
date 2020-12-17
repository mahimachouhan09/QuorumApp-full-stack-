import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { createAnswer, getQuestions } from '../actions/index';
import { Button } from '@material-ui/core';

class Answer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          id: "",
          question: this.props.id,
          user: "",
          content: "",
          answered_date: "",
          comments_count: "",
          photo : null,
          comments: [
            {
              id: "",
              comment: "",
              created_on: "",
              user: "",
              answer: ""
            }
         ],
        showForm: false
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange = e => {
    if (e.target.name === 'content') {
      this.setState({ content: e.target.value });
    } 
    if (e.target.name === 'photo') {
      this.setState({ photo: e.target.files[0]}
      );
    }
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    var AnswerformData = new FormData();
    AnswerformData.append('question',this.state.question)
    AnswerformData.append('content',this.state.content)
    AnswerformData.append('photo',this.state.photo, this.state.photo.name);
    this.props.createAnswer(AnswerformData,()=>{this.props.getQuestions()})
    this.setState({ showForm: false})
  }

  showForm = () => {
    return (
      <form className="answer-text" onSubmit={this.handleOnSubmit}>
      <input
        type="text"
        name="content"
        value={this.state.content}
        onChange={this.handleOnChange}
      />

       <div>
          <label>photo</label>
          <input
            type="file"
            name="photo"
            accept="image/png, image/jpeg"
            onChange={this.handleOnChange}
          />
        </div>

      <Button variant="contained" color="primary" onClick= {this.handleOnSubmit}>
        Answer</Button>
    </form>
    );
  }
  
  render() {
    return (     
      <React.Fragment>
        <Button type="button" variant="contained" color="primary" style={{display:"flex"}}
          onClick={() => this.setState({ showForm: true })}>
          Answer
        </Button>  
        {this.state.showForm ? this.showForm() : null}
      </React.Fragment>
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