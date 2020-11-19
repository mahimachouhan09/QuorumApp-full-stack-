import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchQuestions } from '../actions'
import {Button} from '@material-ui/core'

export class SearchQuestion extends Component {
  constructor(props){
    super(props)
    this.state = {
      username : '',
    }
  }
  onInputChange = event => this.setState({ username: event.target.value })

  onFormSubmit = event => {
    event.preventDefault();
    this.props.searchQuestions(this.state.username)
    this.setState({ username: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.onFormSubmit} >
          <input type = 'text' value = {this.state.username} onChange = {this.onInputChange}/>
          <Button variant="contained" color="primary" onClick={this.onFormSubmit}>
            search by username
          </Button>
        </form>
      </div>
    )
  }
}

export default connect(null, { searchQuestions })(SearchQuestion)