import React, { Component } from 'react'
import { compose } from 'recompose'
import { following } from '../actions/index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class Follower extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      user: {
          username: "",
          id: ""
      },
      follower: {
          username: "",
          id: ""
      }
    }
  }
  
componentDidMount(){
  this.props.following(this.props.id)
}
  
render() { 
  const { following }= this.props.followingreducer

    return (
      <React.Fragment>
        Following
        <ul className= 'feed-block-ul'>
          {following && following.map((value ,index) => (
            <li className ='feed-block-li' key = { index }> 
              {value.user.username}
            </li>
          ))}
        </ul>    
      </React.Fragment>
    )
  }
}


const mapStateToProps = ({ authlogin, followingreducer }, props) => {
  const id = props.match.params.id;
  return {
      id,
      authlogin,
      followingreducer
  }
}

export default compose(withRouter,connect(mapStateToProps,{ following}))(Follower);