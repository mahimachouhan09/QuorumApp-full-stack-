import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getprofiles } from '../actions/index'
import Follow from './Follow'
import EditProfile from './EditProfile'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core';


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
    // const { isAuthenticated } = this.props.authlogin
        const {pk} = this.props.authlogin.user
        // console.log(this.props.authlogin)
        // console.log("as",pk)
    return (
      <div>
        <ul>
      { profiles.map((value ,index)=> ( 
        <li key = { index }>   
          userId :     
          id : {value.id}<br/>   
          first_name : {value.first_name}<br/>              
          last_name : {value.last_name}<br/>   
          username  : {value.username}<br/>
              {/* {value.profile.map((item,index)=>(
                    <li key = { index }>
                      {console.log("idprofile",item.id)}
                        id : {item.id}
                    </li>
                  ))} */}

          <Link to={`/followers/${value.id}`}>followers</Link>
          <Link to={`/following/${value.id}`}>following</Link>
          {/* <a href="/${value.id}/followers">
            followers
          </a> */}

          <Follow id={value.id}> </Follow>
          {(pk === value.id)?<EditProfile  data={value}>
              <button >EDIT PROFILE</button></EditProfile>:<p>paragraph</p>  
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