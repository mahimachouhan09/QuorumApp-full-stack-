import React, { Component } from 'react'
import { follow } from '../actions/index'
import { connect } from 'react-redux'

export class Follow extends Component {

  render() {
    return (
      <div>
        {/* "follower" is the user which is logged in */}
        {/* "user" is getting followed by "follower" */}
        <button onClick = {() => this.props.follow(this.props.id)}
          style = {{ backgroundColor: '#099993', borderColor: '#099983' }}>
          Follow
        </button>
      </div>
    )
  }
}

export default connect(null,{ follow })(Follow);