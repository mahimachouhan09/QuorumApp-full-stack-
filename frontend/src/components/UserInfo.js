import moment from 'moment'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Radio ,FormControl,FormLabel,RadioGroup,FormControlLabel} from '@material-ui/core';
import { createProfile,getUserInfo,getprofiles } from '../actions/index'
import EditProfile from './EditProfile'
import EditUserInfo from './EditUserInfo'
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
        errors : {},
        showForm:false
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
    const { userinfo } = this.props.userinforeducer
    const { pk, username, email,first_name,last_name} = this.props.authlogin.user //login detail
    const value= { pk, username, email,first_name,last_name}

    return (
      <div>
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
          <Link className="btn btn-primary" href="/changepassword" to="/changepassword">
            Change password
          </Link>

          <EditUserInfo data = {value}/>

          <Button type="button" variant="contained" color="primary"
            onClick={() => this.setState({ showForm: true })}>
            Create Profile
          </Button>

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
                  <div> Dob: {value.dob}</div>
                </div>
                <div className="row"> Gender:{value.gender}</div>
                <div className="row"> Contact Number:{value.contact_number}</div>
                <div className="row"> Followers: {value.followers_count},Following: {value.following_count}</div>
                <Link to={`/followers/${value.user_id}`} id={value.user_id} query={{follower_id: "id" }}>
                followers{value.followers_count}</Link>&nbsp;

                <Link to={`/following/${value.user_id}`} id={value.user_id} query={{following_id: "id" }}>
                following {value.following_count}</Link>
              
                </div> <EditProfile  data={value}></EditProfile>
                </div>     
              :<p></p>}    
            </li>
          ))}
          </ul>    
        </div>
        {this.state.showForm ? this.showForm() : null}
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

export default connect(mapStateToProps, {createProfile,getUserInfo,getprofiles})(UserInfo)
