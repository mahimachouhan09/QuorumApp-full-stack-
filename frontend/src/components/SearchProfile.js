import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchProfile } from '../actions/index'
import {Button} from '@material-ui/core'

class SearchProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      profile : '',
    }
  }
  
  onInputChange = event => this.setState({ profile: event.target.value })

  onFormSubmit = event => {
    event.preventDefault();
    this.props.searchProfile(this.state.profile)
    this.setState({ profile: '' })
  }

  render() {
    return (
      <div style={{marginTop:"40px", position:"relative"}}>
        <form onSubmit = {this.onFormSubmit} >
          <input type = 'search' value = {this.state.profile} onChange = {this.onInputChange}/>
          <Button variant="contained" color="primary" onClick={this.onFormSubmit}>
            search
          </Button>
        </form>
      </div>
    )
  }
}

export default connect(null, {searchProfile})(SearchProfile)