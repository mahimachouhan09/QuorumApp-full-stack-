import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getprofiles } from '../actions/index'
import Follow from './Follow'
import EditProfile from './EditProfile'
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
        <ul>
          { profiles.map((value ,index)=> ( 
            <li key = { index }>  
              <Avatar src={value.profile_pic} />
              id : {value.id}<br/>   
              first_name : {value.first_name}<br/>              
              last_name : {value.last_name}<br/>   
              username  : {value.username}<br/>
              dob: {value.dob}<br/>
              gender:{value.gender}<br/>
              contact_number:{value.contact_number}<br/>
              user_id: {value.user_id},<br/>
              followers_count: {value.followers_count},
              following_count: {value.following_count},<br/>
              follow_status:{value.follow_status}<br/>

              <Link to={`/followers/${value.id}`}>followers</Link>
              <Link to={`/following/${value.id}`}>following</Link>
              {console.log(value.user_id,value.follow_status)}
              {(pk !== value.user_id)?
                <Follow  id={value.user_id} follow_status={value.follow_status} />
              :<p></p>  
              }

              {(pk === value.user_id)?<EditProfile  data={value}></EditProfile>:<p></p>}
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