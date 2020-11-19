import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editQuestion,getQuestions } from '../actions/index'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

export class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state ={
        id: this.props.data.id,
        user: this.props.data.user,
        question: this.props.data.question,
        pub_date: this.props.data.pub_date,
        description: this.props.data.description,
        showForm: false
        }
    this.handleOnChange = this.handleOnChange.bind(this);
}

handleOnChange = e => {
  if (e.target.name === 'question') {
    this.setState({question: e.target.value} );

  } else if (e.target.name === 'description') {
    this.setState({ description: e.target.value  || '' });

  }
}

handleOnSubmit = async(event) => {
    event.preventDefault();
    var EditFormData = new FormData();
    EditFormData.append('question', this.state.question);
    EditFormData.append('description', this.state.description);
    await this.props.editQuestion(this.props.data.id, EditFormData)
    await this.props.getQuestions()
}

showForm = () => {
    return (<div>
        <form onSubmit={this.handleOnSubmit}>
          <div>
        <input
          type="text"
          name="question"
          value={this.state.question}
          onChange={this.handleOnChange}
          placeholder="edit Question"
        />
        </div>
        <div>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleOnChange}
          placeholder="edit description"
        />
        </div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EditIcon />}
          onClick = {this.handleOnSubmit}
        >
          Edit 
        </Button>
        </form>
    </div>
    );
}

  render() {
    return (
      <div>
          <Button type="button" 
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => this.setState({ showForm: true })}
          >
            Edit Question
          </Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null, { editQuestion,getQuestions } )(EditQuestion)
