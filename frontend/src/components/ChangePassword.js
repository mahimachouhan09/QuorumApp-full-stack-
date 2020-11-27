import React, { Component } from 'react'
import  {connect} from 'react-redux'
import {changepassword} from '../actions/index'
import { withRouter } from "react-router-dom";
import { Button, FormControl, Input } from '@material-ui/core';

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        new_password1:'',
        new_password2:'',
      },
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
      changeEmailFormData.append('new_password1', this.state.input.new_password1);
      changeEmailFormData.append('new_password2', this.state.input.new_password2);
      this.props.changepassword(changeEmailFormData)
      this.props.history.push('/login')
      let input = {};
      input["new_password1"] = "";
      input["new_password2"] = "";
        
      this.setState({input:input});
    }
    else {
      alert("both password must be same.")
    }
  }
  
  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;
  
    if (!input["new_password1"]) {
      isValid = false;
      errors["new_password1"] = "Please enter your password.";
    }
  
    if (!input["new_password2"]) {
      isValid = false;
      errors["new_password2"] = "Please enter your confirm password.";
    }
  
    if (typeof input["new_password1"] !== "undefined" && typeof input["new_password2"] !== "undefined") {
     
      if (input["new_password1"] !== input["new_password2"]) {
        isValid = false;
        errors["new_password1"] = "Passwords don't match.";
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
          <div>
            <FormControl>
          <label>new_password1</label>
            <Input
              type="password"
              name="new_password1"
              value={this.state.input.new_password1}
              onChange={this.handleOnChange}
            /><br/>
        </FormControl>
        </div>
        <div>
        <FormControl>
        <label>new_password2</label>
        <Input
          type="password"
          name="new_password2"
          value={this.state.input.new_password2}
          onChange={this.handleOnChange}
        />
        </FormControl><br/><br/>
        </div>
        <Button variant="contained" color="primary" onClick={this.handleOnSubmit}> change password</Button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, {changepassword})(ChangePassword));
