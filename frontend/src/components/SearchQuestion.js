import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchquestion } from '../actions'

export class SearchQuestion extends Component {
  constructor(props){
    super(props)
    this.state = {
      topic : '',
    }
  }
  onInputChange = event => this.setState({ topic: event.target.value })

  onFormSubmit = event => {
    event.preventDefault();
    this.props.searchquestion(this.state.topic)
    this.setState({ topic: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.onFormSubmit} >
        <input type = 'text' value = {this.state.topic} onChange = {this.onInputChange}/>
        <button> search </button>
        </form>
      </div>
    )
  }
}

export default connect(null, { searchquestion })(SearchQuestion)