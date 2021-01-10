import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createProfile } from '../actions/index'
import { Button, Radio ,FormControl,FormLabel,RadioGroup,FormControlLabel} from '@material-ui/core';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export class CreateProfile extends Component {
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
        errors : {},
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

  validate(){
    let dob = this.state.dob;
    let errors = {};
    let isValid = true;

    var eightYearsAgo = moment().subtract(8, "years");
    var birthdate = moment(dob);

    if (!eightYearsAgo.isAfter(birthdate)){
        isValid = false;
        errors["dob"] = "Please enter your correct dob.";
        return alert("Enter correct date");    
    }

    this.setState({ errors: errors });
    return isValid;
  }
  
  handleOnSubmit = (e) => {
    e.preventDefault();
    if(this.validate()){
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

      this.setState({
        showForm:false
      })
    }
  }

  render() {
    return (
      <div>
        <h4 style={{ color:'#002984', fontsize: "large" ,margin:"0 0"}}>Create Profile</h4>
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
         Save
        </Button>
      </form>
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
export default connect(mapStateToProps, {createProfile})(CreateProfile)
