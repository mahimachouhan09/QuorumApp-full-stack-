import React, { Component } from 'react'
import { Button, Radio ,FormControl,FormLabel,RadioGroup,FormControlLabel} from '@material-ui/core';
import { connect } from 'react-redux';
import { createProfile } from '../actions/index'
// import 'react-phone-number-input/style.css'

export class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: "",
        username: "",
        first_name: "",
        last_name: "" ,
        dob: "",
        profile_pic: "",
        gender: "",
        contact_number: "",
        user_id: "",
        errors: {}
      }   
      this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange = e => {
    if (e.target.name === 'dob') {
      this.setState({ dob: e.target.value});
    } if (e.target.name === 'contact_number') {
      this.setState({ contact_number: e.target.value }
      );
    } if (e.target.name === 'gender') {
      this.setState({ gender: e.target.value }
      );
    } if (e.target.name === 'profile_pic') {
      this.setState({ profile_pic: e.target.files[0]}
      );
    }
  }


  handleOnSubmit = (e) => {
    e.preventDefault();
    var EditformData = new FormData();
    EditformData.append('user_id', this.props.authlogin.user.user_id);
    EditformData.append('username', this.props.authlogin.user.username);
    EditformData.append('first_name', this.props.authlogin.user.first_name);
    EditformData.append('last_name', this.props.authlogin.user.last_name);
    EditformData.append('dob', this.state.dob);
    EditformData.append('gender', this.state.gender);
    EditformData.append('contact_number', this.state.contact_number)
    EditformData.append('profile_pic', this.state.profile_pic, this.state.profile_pic.name);
    this.props.createProfile(EditformData)
  }

  validate(){
    if (typeof this.state.contact_number !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      // if (!pattern.test(this.state.contact_number)) {
      //   isValid = false;
      //   errors["phone"] = "Please enter only number.";
      // }else if(input["phone"].length != 10){
      //   isValid = false;
      //   errors["phone"] = "Please enter valid phone number.";
      // }
    }
    // return isValid;
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
          <input
            type="number" pattern="\d{3}[\-]\d{3}[\-]\d{4}"
            name="contact_number"
            value={this.state.contact_number}
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
            required
          />
        </div>
        <Button onClick={this.handleOnSubmit} variant="contained" color="secondary">
         Create Profile
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
          Create Profile
        </button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

const mapStateToProps = ({ authlogin }) => {
  return { 
      authlogin,
      
  }
}

export default connect(mapStateToProps, {createProfile})(UserInfo)
