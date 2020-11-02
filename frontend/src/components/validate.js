import axios from "axios"

export const validate = (values) => {
  const errors = {};
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (!values.email) {
    errors.email = "Required!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required!";
  } else if (!strongRegex.test(values.password)) {
    errors.password = "Password should be alphanumeric";
  }
  if (!values.re_password) {
    errors.re_password = "Required";
  } else if (!strongRegex.test(values.re_password)) {
    errors.re_password = "Password should be alphanumeric";
  } else if (values.password !== values.re_password) {
    errors.re_password = "Password should be exact same";
  }
  if (!values.first_name) {
    errors.first_name = "First name can't be null";
  } else if (values.first_name.length < 3) {
    errors.first_name = "Name must be 3 letter long";
  }
  if (!values.last_name) {
    errors.last_name = "Last name can't be null";
  } else if (values.last_name.length < 3) {
    errors.last_name = "Last name must be 3 letter long";
  }
  return errors;
};



export const asyncValidate = (values) => {

  const obj = {
    username: values.username,
    email: values.email,
    password1: values.password,
    password2: values.re_password,
  };

  axios
    .post(`http://127.0.0.1:8000//rest-auth/registration/`, obj)
    .then((response) => {
    })
    .catch((error) => {
      const errors = error.response.data;
    });
};

export default asyncValidate;

