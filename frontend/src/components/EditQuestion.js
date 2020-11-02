import React, { Component } from 'react'
import { connect } from 'react-redux'
import {editQuestion,getQuestions} from '../actions/index'

export class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: {
        id: this.props.data.id,
        user: this.props.data.user,
        question: this.props.data.question,
        pub_date: this.props.data.pub_date,
        description: this.props.data.description,
        likes_count: this.props.data.likes_count,
        dislikes_count: this.props.data.dislikes_count,
        answers: [
            {
                id: this.props.data.answers.id,
                question: this.props.data.answers.question,
                user: this.props.data.answers.user,
                content: this.props.data.answers.content,
                answered_date: this.props.data.answers.answered_date,
                likes_count: this.props.data.answers.likes_count,
                dislikes_count: this.props.data.answers.dislikes_count,
                comments_count: this.props.data.answers.comments_count,
                comments: [
                    {
                        id: this.props.data.answers.comments.id,
                        comment: this.props.data.answers.comments.comment,
                        created_on: this.props.data.answers.comments.created_on,
                        user: this.props.data.answers.comments.user,
                        answer: this.props.data.answers.comments.answer,
                    }
                ]
            }
        ]
        }
    }
    this.handleOnChange = this.handleOnChange.bind(this);
}


handleOnChange = e => {
  if (e.target.name === 'question') {
    this.setState({ questionData :{
      ...this.state.questionData ,question: e.target.value} });

  } else if (e.target.name === 'description') {
    this.setState({ questionData :{
      ...this.state.questionData ,description: e.target.value  || '' }});

  }
}

handleOnSubmit = event => {
  event.preventDefault()
  this.props.createQuestion(this.state.questionData)
}

handleSubmit = async(event) => {
    event.preventDefault();
    console.log(his.props.data.id, this.state.questionData)
    await this.props.editComment(this.props.data.id, this.state.questionData)
    await this.props.getQuestions()
}

showForm = () => {
    return (<div>
        <form onSubmit={this.handleOnSubmit}>
        <input
          type="text"
          name="question"
          value={this.state.questionData.question}
          onChange={this.handleOnChange}
          placeholder="Ask a Question"
        />
        <input
          type="text"
          name="description"
          value={this.state.questionData.description}
          onChange={this.handleOnChange}
          placeholder="Add description"
        />
        </form>
    </div>
    );
}

  render() {
    return (
      <div>
        <button type="button" onClick={() => this.setState({ showForm: true })}>Edit Question</button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default EditQuestion
