import React, { Component } from 'react'
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

  handleOnSubmit = event => {
    event.preventDefault()
    var resetEmailFormData = new FormData();
    resetEmailFormData.append('email', this.state.email);
    this.props.forgetpassword(resetEmailFormData)
  }

  render() {
    return (
      <div>
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
        <Button type="submit" variant="contained" color="secondary" onClick={this.handleOnSubmit}>
          email
        </Button>
        </form>
      </div>
    )
  }
}

export default connect(null, { forgetpassword })(ForgetPassword)
