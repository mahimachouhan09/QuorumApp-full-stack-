import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editAnswer,getQuestions } from '../actions/index'

export class EditAnswer extends Component {
  constructor(props) {
    super(props);
    this.state ={
        id: this.props.data.id,
        user: this.props.data.user,
        content: this.props.data.content,
        showForm: false
        }

    this.handleOnChange = this.handleOnChange.bind(this);
}


handleOnChange = e => {
  // (e.target.name === 'content')
   this.setState({content: e.target.value} );
}

handleOnSubmit = async(event) => {
    event.preventDefault();
    console.log(this.props.data,this.props.data.id)
    var EditFormData = new FormData();
    EditFormData.append('question', this.props.data.question);
    EditFormData.append('content', this.state.content);
    await this.props.editAnswer(this.props.data.id, EditFormData)
    await this.props.getQuestions()
}

showForm = () => {
    return (<div>
        <form onSubmit={this.handleOnSubmit}>
        <label>answer</label>
        <input
          type="text"
          name="content"
          value={this.state.content}
          onChange={this.handleOnChange}
        />
        <button>EDIT ANSWER</button>
        </form>
        </div>
    );
}

  render() {
    return (
      <div>
        <button type="button" onClick={() => this.setState({ showForm: true })}>
          Edit Answer
        </button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null, { editAnswer ,getQuestions} )(EditAnswer)
