import React, { Component } from 'react'
import { follow } from '../actions/index'
import { connect } from 'react-redux'

export class Follow extends Component {
  render() {
    return (
      <div>
        <button 
          onClick={()=> this.props.follow(this.props.id)}
          // style={{ backgroundColor: '#005933', borderColor: '#005933' }}
          >
          Follow
        </button>   
      </div>
    )
  }
}

export default connect(null,{ follow })(Follow);