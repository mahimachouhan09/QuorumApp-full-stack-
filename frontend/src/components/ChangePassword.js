import React, { Component } from 'react'
import  {connect} from 'react-redux'
import {changepassword} from '../actions/index'

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {}
    };
     
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange=(event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input
    });
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    if(this.validate()){
      var changeEmailFormData = new FormData();
      changeEmailFormData.append('newpassword1', this.state.input.newpassword1);
      changeEmailFormData.append('newpassword2', this.state.input.newpassword2);
      this.props.changepassword(changeEmailFormData)
      let input = {};
      input["newpassword1"] = "";
      input["newpassword2"] = "";
        
      this.setState({input:input});
      alert('Demo Form is submited');
    }
    else {
      alert("both password must be same.")
    }
  }
  
  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;
  
    if (!input["newpassword1"]) {
      isValid = false;
      errors["newpassword1"] = "Please enter your password.";
    }
  
    if (!input["newpassword2"]) {
      isValid = false;
      errors["newpassword2"] = "Please enter your confirm password.";
    }
  
    if (typeof input["newpassword1"] !== "undefined" && typeof input["newpassword2"] !== "undefined") {
     
      if (input["newpassword1"] !== input["newpassword2"]) {
        isValid = false;
        errors["newpassword1"] = "Passwords don't match.";
      }
    } 
  
    this.setState({
      errors: errors
    });
  
    return isValid;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
        <label>newpassword1</label>
        <input
          type="password"
          name="newpassword1"
          value={this.state.input.newpassword1}
          onChange={this.handleOnChange}
        />

        <label>newpassword2</label>
        <input
          type="password"
          name="newpassword2"
          value={this.state.input.newpassword2}
          onChange={this.handleOnChange}
        />
        <button> change password</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {changepassword})(ChangePassword)
