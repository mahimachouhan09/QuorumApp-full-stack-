import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getprofiles } from '../actions/index'
import Follow from './Follow'
import SearchProfile from './SearchProfile'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';


export class Profile extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.authlogin
    if(isAuthenticated){
    this.props.getprofiles()}
  }
  
  render() {
    const { profiles } = this.props.profilereducer
    const { pk } = this.props.authlogin.user

    return (
      <div>
        <SearchProfile/>
        <h4 style={{ color:'#002984', fontsize: "xx-large" }}>Users</h4>
        <ul>
          { profiles.map((value ,index)=> ( 
            <li key = { index }>  
            {(pk !== value.user_id)? <span> 
              <Avatar style ={{display :"flex"}} src={value.profile_pic} />
              First name : {value.first_name}<br/>              
              Last name : {value.last_name}<br/>   
              Username  : {value.username}<br/>
              Dob: {value.dob}<br/>
              Gender:{value.gender}<br/>
              Contact number:{value.contact_number}<br/>
              <Link to={`/followers/${value.id}`} params={{follower_id: "id" }}>
                followers{value.followers_count}</Link>&nbsp;
              <Link to={`/following/${value.id}`} params={{follower_id: "id" }}>
                following {value.following_count}</Link>
              <Follow  id={value.user_id} follow_status={value.follow_status} />
              </span>:<p></p>}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ authlogin, profilereducer }) => {
  return {
    authlogin,
    profilereducer
  }
}

export default connect(mapStateToProps,{ getprofiles })(Profile);