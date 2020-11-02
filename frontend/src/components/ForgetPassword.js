import React, { Component } from 'react'
import {connect} from 'react-redux'
import {forgetpassword} from '../actions/index'

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
        <form onSubmit={this.handleOnSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleOnChange}
        />
        <button> email </button>
        </form>
      </div>
    )
  }
}

export default connect(null, { forgetpassword })(ForgetPassword)
