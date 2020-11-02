import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getprofiles } from '../actions/index'
import Follow from './Follow'
import EditProfile from './EditProfile'
import {Link} from 'react-router-dom'
// import profile_pics from '../profile_pics'

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
    };
  }
  componentDidMount() {
    const { isAuthenticated } = this.props.authlogin
    if(isAuthenticated){
    this.props.getprofiles()}
  }
  
  render() {
    const { profiles } = this.props.profilereducer
    const {pk} = this.props.authlogin.user

    return (
      <div>
        <ul>
          
      { profiles.map((value ,index)=> ( 
        <li key = { index }>   
          id : {value.id}<br/>   
          first_name : {value.first_name}<br/>              
          last_name : {value.last_name}<br/>   
          username  : {value.username}<br/>
          dob: {value.dob}<br/>
          {console.log(value.profile_pic)}
          profile_pic :<img alt = 'abc' src= {`../profile_pics/${value.profile_pic}`}/><br/>
          gender:{value.gender}<br/>
          contact_number:{value.contact_number}<br/>
          user_id: {value.user_id},<br/>
          followers_count: {value.followers_count},<br/>
          following_count: {value.following_count},<br/>
          follow_status:{value.follow_status}<br/>

          <Link to={`/followers/${value.id}`}>followers</Link>
          <Link to={`/following/${value.id}`}>following</Link>

          {(pk !== value.user_id)?
            <Follow  id={value.user_id} follow_status={value.follow_status} />
          :<p></p>  
          }
          {/* <Follow id={value.user_id} follow_status={value.follow_status}/> */}

          {(pk === value.user_id)?<EditProfile  data={value}>
              <button >EDIT PROFILE</button></EditProfile>:<p></p>  
          }
          </li>
      ))
      }
      </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ authlogin, profilereducer  }) => {
  return {
      authlogin,
      profilereducer
  }
}

export default connect(mapStateToProps,{ getprofiles })(Profile);