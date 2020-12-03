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
        <h4 style={{ color:'#002984', fontSize: "xx-large" }}>Profiles</h4>

        <ul className= 'feed-block-ul'>
          { profiles.map((value ,index)=> ( 
            <li className ='feed-block-li' key = { index }>  
            {(pk !== value.user_id)? <span> 
              <Avatar style ={{display :"flex",width: "70px",height: "70px"}}
               src={value.profile_pic} />
              <div>Username  : {value.username}</div>
              <div>First name : {value.first_name}</div>              
              <div>Last name : {value.last_name}</div>    
              <div>Dob: {value.dob}</div>
              <div>Gender:{value.gender}</div>
              <div>Contact number:{value.contact_number}</div>

              <Link to={`/followers/${value.user_id}`} id={value.user_id} query={{follower_id: "id" }}>
                followers{value.followers_count}</Link>&nbsp;

              <Link to={`/following/${value.user_id}`} id={value.user_id} query={{following_id: "id" }}>
                following {value.following_count}</Link>
              
              <Follow  id={value.user_id} follow_status={value.follow_status}/>
              </span>:""}
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