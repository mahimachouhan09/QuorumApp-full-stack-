import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect ,Link} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { login } from '../actions'
import { Button } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';

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
        this.props.login(values , () => {
            this.setState({
              progress: false, username : "" , password : ""
            })
        })
  }

  render() {
    const { isAuthenticated} = this.props.authlogin
      const { progress } = this.state
        if( isAuthenticated ){
          return <Redirect to='/questions' />
        }
        
    return (
      <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
      <form onSubmit={this.onSubmit.bind(this)}>
          <legend style={{ color:'#002984', fontsize: "xx-large" }}>Login</legend>
          <p> <i className="fa fa-user" aria-hidden="true"></i>
            <label>Username</label>
            <input
              value = {this.state.username}
              type="text"
              name="username"
              onChange={this.onInputChange.bind(this)}
              placeholder = "Username"
            />
          </p>
          <p><LockIcon />
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
            <Button variant="contained" color="primary" onClick= {this.onSubmit}>
              Login
            </Button>
          </p>
          <CircularProgress style={progress ? { display: "inline-block" } : { display: "none" }} />
          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
      </form>
      </div>
    )
  }
}

const mapStateToProps = ( {authlogin} ) => {
  return {authlogin}
}

export default connect(mapStateToProps, {login})(Login);
