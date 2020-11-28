import React, { Component } from 'react'
import { Button, Radio ,FormControl,FormLabel,RadioGroup,FormControlLabel} from '@material-ui/core';
import { connect } from 'react-redux';
import { createProfile,getUserInfo,getprofiles } from '../actions/index'
import EditProfile from './EditProfile'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Avatar from '@material-ui/core/Avatar';

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
  
  componentDidMount() {
    const { isAuthenticated } = this.props.authlogin
    if(isAuthenticated){
    this.props.getUserInfo()
    this.props.getprofiles()
  }
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
    );
}

  render() {
    const { profiles } = this.props.profilereducer
    // profiles arrray containing all info of profile
    const { pk, username, email,first_name,last_name} = this.props.authlogin.user //login detail

    return (
      <div>
        <div>
          <h2 style={{ color:'#002984', fontsize: "xx-small" ,margin:"25px"}}>Basic Info</h2>
          <div className="col-md-12">
          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          <span> Username : {username}</span><br/>
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <span> email : {email}</span> <br/>
          <i className="fa fa-user" aria-hidden="true"></i>
          <span> First name : {first_name}</span><br/>
          <i className="fa fa-user" aria-hidden="true"></i>
          <span> Last name : {last_name}</span><br/>
          </div>

        {/* (pk === user_id) condition for profile detail of login user only */}
          <ul>
          { profiles.map((value ,index)=> ( 
            <li key = { index }>
             {console.log(pk)}
             {console.log(value.id)}
             {console.log(pk !== value.id , pk !== value.user_id , value.user_id === "")}
             {console.log(pk !== value.id && pk !== value.user_id )}
              {value.id === null}

              {(pk === value.user_id)?
                <span> 
                  <h2 style={{ color:'#002984', fontsize: "xx-small" ,margin:"25px"}}>Additional details</h2>
                 <form className="col-md-12">
                 <Avatar src={value.profile_pic} />
                <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                <span>  dob: {value.dob}</span><br/>
                  gender:{value.gender}<br/>
                  contact_number:{value.contact_number}<br/>
                  followers: {value.followers_count},
                  following: {value.following_count},<br/>
                  </form>
                  <EditProfile  data={value}></EditProfile>
                </span>
                
              :<p></p>}    
               {/* {(pk !== value.user_id)?
               <p> <Button type="button" variant="contained" color="primary"
                  onClick={() => this.setState({ showForm: true })}>
                  Create Profile
                </Button></p>
              :<p></p>} */}
            </li>
          ))}
          </ul>    
        </div>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

const mapStateToProps = ({ authlogin ,profilereducer}) => {
  return { 
      authlogin,
      profilereducer
  }
}

export default connect(mapStateToProps, {createProfile,getUserInfo,getprofiles})(UserInfo)
