import React, { Component } from 'react'
import { compose } from 'recompose'
import { followers } from '../actions/index'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

export class Follower extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        user: {
            id: "",
            username: ""
        },
        follower: {
            id: "",
            username: ""
        }
    }
  }
  
componentDidMount(){
  this.props.followers(this.props.id)
}
  
render() { 
  const { followers } = this.props.followerreducer
    return (
      // "follower" are the users which are following "user" 
      <React.Fragment>
       <h4 style={{ color:'#002984', fontsize: "xx-large" }}>Followers</h4>
        <ul className= 'feed-block-ul'>
          {followers && followers.map((value ,index) => (
            <li className ='feed-block-li' key = { index }> 
              {value.follower.username}
            </li>
          ))}
        </ul> 
      </React.Fragment>
    )
  }
}


const mapStateToProps = ({ authlogin, followerreducer }, props) => {
  const id = props.match.params.id;
  return {
      id,
      authlogin,
      followerreducer
  }
}

export default compose(withRouter,connect(mapStateToProps,{ followers }))(Follower);