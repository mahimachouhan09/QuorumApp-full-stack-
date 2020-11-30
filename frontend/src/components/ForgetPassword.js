import React, { Component ,Fragment} from 'react'
import {connect} from 'react-redux'
import {forgetpassword} from '../actions/index'
import { Button, FormControl, Input } from '@material-ui/core';


export class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email :""
    }
  }

  handleOnChange = event => this.setState({ email: event.target.value })
  
  validateForm = () => {
    if (/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(this.state.email)){
      return true
    }
    return false
  }

  handleOnSubmit = event => {
    event.preventDefault()
    const isValid = this.validateForm()
    var resetEmailFormData = new FormData();
    this.setState({
      email:'',
    })
    if(isValid){
      resetEmailFormData.append('email', this.state.email);
      this.props.forgetpassword(resetEmailFormData)
    }
    else{
      alert("Enter correct email")
    }
  }

  render() {
    return ( 
      <Fragment>
        <h3>Enter correct email address to reset password.</h3><br/>
        <form onSubmit={this.handleOnSubmit}>
        <FormControl>
        <label>Email</label>
        <Input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleOnChange}
        />
        </FormControl><br /><br />
        <Button type="submit" variant="contained" color="primary" onClick={this.handleOnSubmit}>
          email
        </Button>
        </form>
      </Fragment>
    )
  }
}

export default connect(null, { forgetpassword })(ForgetPassword)
