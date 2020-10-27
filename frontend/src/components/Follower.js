import React, { Component } from 'react'
import { followers } from '../actions/index'
import { connect } from 'react-redux'

export class Follower extends Component {
  // constructor(props){
  //   super(props);
  // }
componentDidMount(){
  console.log(this.props)
  this.props.followers(this.props.id)
}
  
render() { 
  console.log("this.props",this.props)
  const { match: { params } } = this.props;
  const { id } = params;
  console.log("params Id:", id);
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