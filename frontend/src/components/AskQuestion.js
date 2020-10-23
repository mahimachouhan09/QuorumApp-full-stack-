import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../actions/index';

class AskQuestion extends Component {
  constructor() {
      super();
      this.state = {
        // postdata:{
        "user": "",
        "question": "",
        "pub_date": "",
        "topic": [],
        "description": "",
        "likes_count": 0,
        "dislikes_count": 0,
        "answers": [],
        "vote": []
      // }
    }
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault()
    const { history, createQuestion } = this.props
    createQuestion(this.state, history)
    this.setState({ question: '', description: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          type="text"
          name="question"
          value={this.state.question}
          onChange={this.handleOnChange}
          placeholder="Ask a Question"
        />
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleOnChange}
          placeholder="Add description"
        />
        <input
          type="text"
          name="pub_date"
          value={this.state.pub_date}
          onChange={this.handleOnChange}
          placeholder="pub_date"
        />
        <input
          type="text"
          name="answers"
          value={this.state.answers}
          onChange={this.handleOnChange}
          placeholder="answers"
        />
        <button>Ask Question</button>
      </form>
    );
  }
}

export default connect(null, {createQuestion})(AskQuestion);