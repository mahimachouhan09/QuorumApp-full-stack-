import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getprofiles } from '../actions/index'
import Follow from './Follow'
import EditProfile from './EditProfile'
import {Link} from 'react-router-dom'
import {Image, Transformation} from 'cloudinary-react';

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
          profile_pic : 
          <Image cloudName="demo" publicId={value.profile_pic} resizeMode="contain"
           style={{width:300,height:200,backgroundColor:"red"}}>
            <Transformation effect="cartoonify" />
            <Transformation radius="min" />
            <Transformation effect="outline:50" color="lightblue" />
            <Transformation background="lightblue" />
            <Transformation height="25%" crop="scale" />
            <Transformation width="25%" fetchFormat="auto" crop="scale" />
          </Image>
          <br/>
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