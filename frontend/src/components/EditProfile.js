import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editprofile } from '../actions/index'
import { Button, Radio ,FormControl,FormLabel,RadioGroup,FormControlLabel} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      }

      this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange = e => {
    if (e.target.name === 'dob') {
      this.setState({ dob: e.target.value}
      );
    }
    if (e.target.name === 'gender') {
      this.setState({gender: e.target.value }
      );
  
    } if (e.target.name === 'profile_pic') {
      this.setState({profile_pic: e.target.files[0]}
      );
    }
  }


  handleOnSubmit = (e) => {
    e.preventDefault();
    var EditformData = new FormData();
    EditformData.append('dob', this.state.dob);
    EditformData.append('gender', this.state.gender);
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
              value={this.state.dob}
              onChange={this.handleOnChange}
            />
          </div>

          <div>
          <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.handleOnChange}>
            <FormControlLabel value="F" control={<Radio />} label="Female" />
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="O" control={<Radio />} label="Others" />
            <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
          </RadioGroup>
        </FormControl>
          </div>

          <div>
            <label>contact number</label>
            <PhoneInput
              type="text"
              name="contact_number"
              value={this.state.contact_number}
              onChange={contact_number => this.setState({ contact_number })}
              placeholder="contact number"
            />
          </div>
        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            name="profile_pic"
            accept="image/png, image/jpeg"
            onChange={this.handleOnChange}
            required
          />
        </div>
        <Button onClick={this.handleOnSubmit} variant="contained" color="secondary">
         EDIT PROFILE
        </Button>
      </form>
    </div>
    );
}

  render() {
    return (
      <div>
       <Button type="button" variant="contained" color="primary" startIcon={<EditIcon />}
         onClick={() => this.setState({ showForm: true })}
        >
          Edit Profile
        </Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null,{editprofile})(EditProfile);