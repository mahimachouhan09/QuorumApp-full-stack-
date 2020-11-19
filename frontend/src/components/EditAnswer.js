import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editAnswer,getQuestions } from '../actions/index'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

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
   this.setState({content: e.target.value} );
}

handleOnSubmit = async(event) => {
    event.preventDefault();
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
        <Button variant="contained" color="secondary" startIcon={<EditIcon />}
          onClick = {this.handleOnSubmit}>
          EDIT ANSWER
        </Button>
        </form>
        </div>
    );
}

  render() {
    return (
      <div>
       <Button type="button" variant="contained" color="primary" startIcon={<EditIcon />}
          onClick={() => this.setState({ showForm: true })}>
          Edit Answer
        </Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null, { editAnswer ,getQuestions} )(EditAnswer)
