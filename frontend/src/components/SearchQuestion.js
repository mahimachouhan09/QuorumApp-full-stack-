import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchQuestions } from '../actions'

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
    console.log(this.props)
    this.props.searchQuestions(this.state.username)
    this.setState({ username: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.onFormSubmit} >
        <input type = 'text' value = {this.state.username} onChange = {this.onInputChange}/>
        <button> search </button>
        </form>
      </div>
    )
  }
}

export default connect(null, { searchQuestions })(SearchQuestion)