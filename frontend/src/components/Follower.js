import React, { Component } from 'react'
import { followers } from '../actions/index'
import { connect } from 'react-redux'

export class Follower extends Component {
  
componentDidMount(){
  this.props.followers(this.props.id)
}
  
render() { 
  // const { match: { params } } = this.props;
  // const { id } = params;
    return (
      <div>
      </div>
    )
  }
}


const mapStateToProps = ({ authlogin, followerreducer  }) => {
  return { 
      authlogin,
      followerreducer
  }
}

export default connect(mapStateToProps,{ followers })(Follower);