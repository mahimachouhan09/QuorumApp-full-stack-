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
        {/* <div >
          <input class="form-control" type="text" placeholder="Search" aria-label="Search">
        </div> */}
          <input
            className="active-cyan-3 active-cyan-4 mb-4" 
            type = 'search' value = {this.state.profile}
            onChange = {this.onInputChange}/>
          <Button style={{marginLeft:"10px"}} variant="contained" color="primary" onClick={this.onFormSubmit}>
            search
          </Button>
        </form>
      </div>
    )
  }
}

export default connect(null, {searchProfile})(SearchProfile)