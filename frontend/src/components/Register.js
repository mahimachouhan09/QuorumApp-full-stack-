import React, { useState, useRef } from "react";
import {connect} from 'react-redux'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../actions/index";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePasswordOne = (e) => {
    const password1 = e.target.value;
    setPassword1(password1);
  };

  const onChangePasswordTwo = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      props.register(username, email, password1, password2)
    }
  };

  return (
    <div className="col-md-12">
      <h3 style={{ color:'#002984', fontsize: "large" ,margin:"20px 0"}}>Register new User</h3>
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password1">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password1"
                  value={password1}
                  onChange={onChangePasswordOne}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password2">confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="passwor2"
                  value={password2}
                  onChange={onChangePasswordTwo}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button 
                  style={{backgroundColor:"#3f51b5",  borderColor:"#3f51b5"}}
                  className="btn btn-primary btn-block">
                    Sign Up
                </button>
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default connect(null ,{register})(Register);