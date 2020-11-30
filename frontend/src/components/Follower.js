import React, { Component } from 'react'
import { followers } from '../actions/index'
import { connect } from 'react-redux'

export class Follower extends Component {
  constructor(props){
    super(props);
  }
  
componentDidMount(){
  this.props.followers(this.props.id)
}
  
render() { 
  const { match} = this.props;
  console.log(this.props.id)
  // const { id } = params;
    return (
      <React.Fragment>

      </React.Fragment>
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