import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editprofile} from '../actions/index'
import {Button, Radio ,FormControl,FormLabel,RadioGroup,FormControlLabel} from '@material-ui/core';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProfileData:{
        id: this.props.data.id,
        profile: {
            id: this.props.data.profile.id,
            gender: this.props.data.profile.gender,
            contact_number: this.props.data.profile.contact_number,
            profile_pic: this.props.data.profile.profile_picid,
            topics: [
                {
                    id: this.props.data.profile.id,
                    name: this.props.data.profile.name,
                },
            ],
            dob: this.props.data.profile.dob,
            user_id: this.props.data.profile.user_id,
            followers_count: this.props.data.profile.followers_count,
            following_count: this.props.data.profile.following_count,
            follow_status: this.props.data.profile.follow_status
        },
        first_name: this.props.data.first_name,
        last_name: this.props.data.last_name,
        username: this.props.data.username,
        password: this.props.data.password,
      },

      }
      // this.onClick = this.onClick.bind(this);
  }
  handleOnChange = e => {
    if (e.target.name === 'username') {
      this.setState({ProfileData :{
        ...this.state.ProfileData ,username: e.target.value} });

    } else if (e.target.name === 'first_name') {
      this.setState({ ProfileData :{
        ...this.state.ProfileData ,first_name: e.target.value} });
  
    } else if (e.target.name === 'last_name') {
      this.setState({ ProfileData :{
        ...this.state.ProfileData ,last_name: e.target.value  || '' }});
  
    } else if (e.target.name === 'dob') {
      this.setState({
        newUser :{
          ...this.state.newUser ,profile:{ ...this.state.profile, dob: e.target.value || ''}}
      });
  
    } else if (e.target.name === 'contact_number') {
      this.setState({
        newUser :{
          ...this.state.newUser ,profile:{ ...this.state.profile , contact_number: e.target.value }}
      });
    } else if (e.target.name === 'gender') {
      this.setState({
        newUser :{
          ...this.state.newUser ,profile:{ ...this.state.profile, gender: e.target.value || ''}}
      });
  
    }
  }

  handleOnSubmit = event => {
    event.preventDefault()
    // console.log(this.state.ProfileData,this.props.data)
    this.props.editprofile(this.state.ProfileData,this.props.data.id)
  }

  // handleSubmit = async(e) => {
  //   e.preventDefault();
  //   console.log(this.state.newUser,this.props.data.id)
  //   await this.props.updateUser(this.state.newUser,this.props.data.id)
  //   await this.props.fetchUser();
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
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
                              <label>Select Topic</label>
                              {/* <input type="checkbox" name="vehicle1" value="Bike"/>
                              <label for="vehicle1"> I have a bike</label><br>
                              <input type="checkbox" name="vehicle3" value="Boat" checked>
                              <label for="vehicle3"> I have a boat</label><br><br> */}
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
      </form>
      </div>
    )
  }
}

export default connect(null,{editprofile})(EditProfile);