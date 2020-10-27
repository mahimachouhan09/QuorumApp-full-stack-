import React, { Component } from 'react'

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProfileData:{
        id: "",
        profile: {
            id: "",
            gender: "",
            contact_number: "",
            profile_pic: "",
            topics: [
                {
                    id: "",
                    name: ""
                },
            ],
            dob: "",
            user_id: "",
            followers_count: "",
            following_count: "",
            profile_belongs_to_authenticated_user : false,
            follow_status: ""
        },
        first_name: "",
        last_name: "",
        username: "",
        password: "",
      },

      }
      this.onClick = this.onClick.bind(this);
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
  
    }

    else if (e.target.name === 'dob') {
      this.setState({
        newUser :{
          ...this.state.newUser ,profile:{ ...this.state.profile, dob: e.target.value || ''}}
      });
  
    } else if (e.target.name === 'contact_number') {
      this.setState({
        newUser :{
          ...this.state.newUser ,profile:{ ...this.state.profile , contact_number: e.target.value }}
      });
  
    }
    else if (e.target.name === 'gender') {
      this.setState({
        newUser :{
          ...this.state.newUser ,profile:{ ...this.state.profile, gender: e.target.value || ''}}
      });
  
    }
  }

  handleOnSubmit = event => {
    event.preventDefault()
    console.log(this.state.ProfileData)
    this.props.editprofile(this.state.ProfileData)
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
            <label>gender</label>
          {/* <input type="radio" id="male" name="gender" value="male"/>
          <label for="male">Male</label><br>
           <input type="radio" id="female" name="gender" value="female"/>
           <label for="female">Female</label><br>
           <input type="radio" id="other" name="gender" value="other"/>
          <label for="other">Other</label></br> */}
          </div>
          <div>
          <label>contact number</label>
          <input
            type="text"
            name="contact_number"
            value={this.state.ProfileData.contact_number}
            onChange={this.handleOnChange}
          />
          </div>
          <div>
            <input
              type="text"
              name="dob"
              value={this.state.ProfileData.dob}
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

export default EditProfile;