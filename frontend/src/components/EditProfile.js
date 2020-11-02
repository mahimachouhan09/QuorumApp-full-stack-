import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editprofile} from '../actions/index'
import { Radio ,FormControl,FormLabel,RadioGroup,FormControlLabel} from '@material-ui/core';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProfileData:{
        id: this.props.data.id,
   
           
        //     gender: this.props.data.profile.gender,
        //     contact_number: this.props.data.profile.contact_number,
        //     profile_pic: this.props.data.profile.profile_pic,
        //     dob: this.props.data.profile.dob,
        //     user_id: this.props.data.profile.user_id,
        //     followers_count: this.props.data.profile.followers_count,
        //     following_count: this.props.data.profile.following_count,
        //     follow_status: this.props.data.profile.follow_status
        // },
        // first_name: this.props.data.first_name,
        // last_name: this.props.data.last_name,
        // username: this.props.data.username,
        // password: this.props.data.password,

        // "id": 1,
        //     "username": "mahimachouhan",
        //     "first_name": "mahima",
        //     "last_name": "Chouhan",
        //     "dob": "1998-12-09",
        //     "profile_pic": "http://127.0.0.1:8000/profile/frontend/src/profile_pics/userauthapi.png",
        //     "gender": "F",
        //     "contact_number": "7415405719",
        //     "user_id": 2,
        //     "followers_count": 0,
        //     "following_count": 0,
        //     "follow_status": "Follow"
      },

      }
      // this.onClick = this.onClick.bind(this);
  }
  // handleOnChange = e => {
  //   if (e.target.name === 'username') {
  //     this.setState({ProfileData :{
  //       ...this.state.ProfileData ,username: e.target.value} });

  //   } else if (e.target.name === 'first_name') {
  //     this.setState({ ProfileData :{
  //       ...this.state.ProfileData ,first_name: e.target.value} });
  
  //   } else if (e.target.name === 'last_name') {
  //     this.setState({ ProfileData :{
  //       ...this.state.ProfileData ,last_name: e.target.value  || '' }});
  
  //   } else if (e.target.name === 'dob') {
  //     this.setState({
  //       newUser :{
  //         ...this.state.newUser ,profile:{ ...this.state.profile, dob: e.target.value || ''}}
  //     });
  
  //   } else if (e.target.name === 'contact_number') {
  //     this.setState({
  //       newUser :{
  //         ...this.state.newUser ,profile:{ ...this.state.profile , contact_number: e.target.value }}
  //     });
  //   } else if (e.target.name === 'gender') {
  //     this.setState({
  //       newUser :{
  //         ...this.state.newUser ,profile:{ ...this.state.profile, gender: e.target.value || ''}}
  //     });
  
  //   }
  // }

  // handleOnSubmit = event => {
  //   event.preventDefault()
  //   // console.log(this.state.ProfileData,this.props.data)
  //   this.props.editprofile(this.state.ProfileData,this.props.data.id)
  // }

  // handleSubmit = async(e) => {
  //   e.preventDefault();
  //   console.log(this.state.newUser,this.props.data.id)
  //   await this.props.updateUser(this.state.newUser,this.props.data.id)
  //   await this.props.fetchUser();
  // }

  render() {
    return (
      <div>
        {/* <form onSubmit={this.handleOnSubmit}>
          <div>
          <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleOnChange}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
          </RadioGroup>
        </FormControl>
          </div>

          <div>
          <label>contact number</label>
          <input
            type="text"
            name="contact_number"
            value={this.state.ProfileData.profile.contact_number}
            onChange={this.handleOnChange}
          />
          </div>
          <div>
            <input
              type="text"
              name="dob"
              value={this.state.ProfileData.profile.dob}
              onChange={this.handleOnChange}
            />
          </div>
        <div>
          <label>first name</label>
          <input
            type="text"
            name="first_name"
            value={this.state.ProfileData.first_name}
            onChange={this.handleOnChange}
          />
        </div>
        <div>
        <label>last name</label>
        <input
          type="text"
          name="last_name"
          value={this.state.ProfileData.last_name}
          onChange={this.handleOnChange}
        />
        </div>

        <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={this.state.ProfileData.username}
          onChange={this.handleOnChange}
          placeholder="Ask a username"
        />
        </div>

        <button>Edit</button>
      </form> */}
      </div>
    )
  }
}

export default connect(null,{editprofile})(EditProfile);