import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect ,Link} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { login } from '../actions'

class Login extends Component {
  state = {
    username: "",
    password: "",
    progress: false,
  }

  onInputChange(e){
    this.setState({[e.target.name] : e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();
    const { progress , ...values} = this.state
        this.setState({ progress: true })
        console.log(values,progress)
        this.props.login(values , () => {
            this.setState({
              progress: false, username : "" , password : ""
            })
        })
  }

  render() {
    const { isAuthenticated,token } = this.props.authlogin
    console.log(token)
        const {progress} = this.state
        if ( isAuthenticated ){
            return <Redirect to='/questions' />
        }
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <fieldset>
          <legend>Login</legend>
          <p>
            <label>Username</label>
            <input
              value = {this.state.username}
              type="text"
              name="username"
              onChange={this.onInputChange.bind(this)}
              placeholder = "Username"
            />
          </p>
          <p>
            <label>Password</label>
            <input
              value={this.state.password}
              type="password"
              name="password"
              onChange={this.onInputChange.bind(this)}
              placeholder="Password"
            />
          </p>
          <p>
            <button>Login</button>
            <CircularProgress style={progress ? { display: "inline-block" } : { display: "none" }} />
          </p>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = ( {authlogin} ) => {
  return {authlogin}
}

export default connect(mapStateToProps, {login})(Login);
