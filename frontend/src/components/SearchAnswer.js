import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchAnswers } from '../actions/index'
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
    this.props.searchAnswers(this.state.username)
    this.setState({ username: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.onFormSubmit} >
          <input type = 'search' value = {this.state.username} onChange = {this.onInputChange}/>
          <Button variant="contained" color="primary" onClick={this.onFormSubmit}>
            search
          </Button>
        </form>
      </div>
    )
  }
}

export default connect(null, { searchAnswers })(SearchQuestion)