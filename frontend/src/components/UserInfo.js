import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {getUserInfo,getprofiles} from '../actions/index'
import EditProfile from './EditProfile'
import EditUserInfo from './EditUserInfo'
import Avatar from '@material-ui/core/Avatar';

export class UserInfo extends Component {
  componentDidMount(){
    const {isAuthenticated} = this.props.authlogin
    if(isAuthenticated){
    this.props.getUserInfo()
    this.props.getprofiles()
    }
  }

  render() {
    const { profiles } = this.props.profilereducer
    const { userinfo } = this.props.userinforeducer
    const { pk, username, email,first_name,last_name} = this.props.authlogin.user
    const value= { pk, username, email,first_name,last_name}

    return (
        <div>
          <h2 style={{ color:'#002984', fontsize: "xx-small" ,margin:"25px", position:"relative"}}>
            Basic Info</h2>

          <div className="container">
            <div className="row">
              <div><i className="fa fa-user-circle-o" aria-hidden="true"></i></div>
              <div> Username : {userinfo.username}</div>
            </div>
            <div  className="row">
              <div><i className="fa fa-envelope" aria-hidden="true"></i></div>
              <div> Email : {userinfo.email}</div>
            </div>
            <div  className="row">
              <div><i className="fa fa-user" aria-hidden="true"></i></div>
              <div> First name : {userinfo.first_name}</div>
            </div>
            <div  className="row">
              <div><i className="fa fa-user" aria-hidden="true"></i></div>
              <div> Last name : {userinfo.last_name}</div>
            </div> 
          </div>
          
          <Link className="btn btn-primary" to="/changepassword">
            Change password
          </Link>
          
          <Link className="btn btn-primary" to="/favourite-questions">
            Favourite Questions
          </Link>

          <Link className="btn btn-primary" to="/createprofile">
            Create Profile
          </Link>

          <EditUserInfo data = {value}/>

        {/* (pk === user_id) condition for profile detail of login user only */}

          <ul>
          { profiles.map((value ,index)=> ( 
            <li key = { index }>
              {(pk === value.user_id)?
                <div> 
                  <h2 style={{ color:'#002984', fontsize: "xx-small" ,margin:"25px"}}>
                   Additional details
                  </h2>
                <div>
                <div className="row">
                  <Avatar 
                    style ={{display :"flex",width: "70px",height: "70px"}}
                    src={value.profile_pic} />
                </div>
                <div className="row">
                  <div><i className="fa fa-birthday-cake" aria-hidden="true"></i></div>
                  <div> Dob : {value.dob}</div>
                </div>
                <div className="row"> Gender : {value.gender}</div>
                <div className="row"> Contact No. : {value.contact_number}</div>

                <Link to={`/followers/${value.user_id}`} id={value.user_id} query={{follower_id: "id" }}>
                followers{value.followers_count}</Link>&nbsp;

                <Link to={`/following/${value.user_id}`} id={value.user_id} query={{following_id: "id" }}>
                following {value.following_count}</Link>

                </div><EditProfile  data={value}></EditProfile>
                </div>     
              :null}
            </li>
          ))}
          </ul>    
        </div>
    )
  }
}

const mapStateToProps = ({ authlogin ,profilereducer,userinforeducer}) => {
  return { 
      authlogin,
      profilereducer,
      userinforeducer
  }
}

export default connect(mapStateToProps, {getUserInfo,getprofiles})(UserInfo)
