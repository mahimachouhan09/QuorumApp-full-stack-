import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../actions/index';
import { Button, FormControl, Input } from '@material-ui/core';

class AskQuestion extends Component {
  constructor(props) {
      super(props);
      this.state = {
        newquestion:{
          id: "",
          user: this.props.authlogin.user.pk,
          question: "",
          pub_date: "",
          description: "",
          likes_count: "",
          dislikes_count: "",
          answers: [
              {
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
              },
            ]
        }
    }
  }

  handleOnChange = e => {
    if (e.target.name === 'question') {
      this.setState({ newquestion :{
        ...this.state.newquestion ,question: e.target.value} });
  
    } else if (e.target.name === 'description') {
      this.setState({ newquestion :{
        ...this.state.newquestion ,description: e.target.value  || '' }});
  
    }
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.createQuestion(this.state.newquestion)
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <FormControl>
          <label>Type Question</label>
          <Input
            type="text"
            name="question"
            value={this.state.newquestion.question}
            onChange={this.handleOnChange}
            placeholder="Ask a Question"
          />  
        </FormControl><br />

        <FormControl>
          <label>description</label>
          <Input
            type="text"
            name="description"
            value={this.state.newquestion.description}
            onChange={this.handleOnChange}
            placeholder="Add description"
          />
        </FormControl><br/><br/>
        <Button  variant="contained" color="secondary" onClick={this.handleOnSubmit}>
          Ask Question
        </Button>
      </form>
    );
  }
}

const mapStateToProps = ({ authlogin }) => {
  return {
    authlogin,
  }
}

export default connect(mapStateToProps, {createQuestion})(AskQuestion);