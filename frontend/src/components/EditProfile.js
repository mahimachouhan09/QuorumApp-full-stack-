import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editprofile} from '../actions/index'
import { Button, Radio ,FormControl,FormLabel,RadioGroup,FormControlLabel} from '@material-ui/core';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData:{
        id: this.props.data.id,
        username: this.props.data.id,
        first_name: this.props.data.first_name,
        last_name: this.props.data.last_name ,
        dob: this.props.data.dob,
        profile_pic: this.props.data.profile_pic,
        gender: this.props.data.gender,
        contact_number: this.props.data.contact_number,
        user_id: this.props.data.user_id,
        followers_count:this.props.data.followers_count,
        following_count: this.props.data.following_count,
        follow_status: this.props.data.follow_status
      },

      }

      this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange = e => {
    if (e.target.name === 'dob') {
      this.setState({
        profileData :{
          ...this.state.profileData , dob: e.target.value}
      });
  
    } if (e.target.name === 'contact_number') {
      this.setState({
        profileData :{
          ...this.state.profileData ,contact_number: e.target.value }
      });
    } if (e.target.name === 'gender') {
      this.setState({
        profileData :{
          ...this.state.profileData ,gender: e.target.value }
      });
  
    } if (e.target.name === 'profile_pic') {
      this.setState({
        profileData :{
          ...this.state.profileData ,profile_pic: e.target.files[0]}
      });
  
    }
  }


  handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log( this.props.profile_pic, this.props.profile_pic.name)
    var EditformData = new FormData();
    EditformData.append('dob', this.state.dob);
    EditformData.append('contact_number', this.state.contact_number)
    EditformData.append('profile_pic', this.state.profile_pic, this.state.profile_pic.name);
    this.props.editprofile(EditformData, this.props.data.id)
  }

  showForm = () => {
    return (<div>
         <form onSubmit={this.handleOnSubmit}>
          <div>
            <label>dob</label>
            <input
              type="date"
              name="dob"
              value={this.state.profileData.dob}
              onChange={this.handleOnChange}
            />
          </div>

          <div>
          <label>contact number</label>
          <input
            type="text"
            name="contact_number"
            value={this.state.profileData.contact_number}
            onChange={this.handleOnChange}
          />
          </div>
          
        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            name="profile_pic"
            accept="image/png, image/jpeg"
            onChange={this.handleOnChange}
          />
        </div>
        <Button type='submit' onClick={this.handleOnSubmit} variant="contained" color="secondary">
         EDIT PROFILE
        </Button>
      </form>
    </div>
    );
}

  render() {
    return (
      <div>
        <button
         type="button" 
         onClick={() => this.setState({ showForm: true })}
        >
          Edit Profile
        </button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null,{editprofile})(EditProfile);