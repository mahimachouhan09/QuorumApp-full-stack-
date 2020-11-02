import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../actions/index';

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
    // const { history, createQuestion } = this.props
    // createQuestion(this.state, history)
    this.props.createQuestion(this.state.newquestion)
    // this.props.getQuestions();
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          type="text"
          name="question"
          value={this.state.newquestion.question}
          onChange={this.handleOnChange}
          placeholder="Ask a Question"
        />
        <input
          type="text"
          name="description"
          value={this.state.newquestion.description}
          onChange={this.handleOnChange}
          placeholder="Add description"
        />
        <button>Ask Question</button>
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