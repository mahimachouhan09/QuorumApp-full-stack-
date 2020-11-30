import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { editUserInfo ,getUserInfo} from '../actions/index'
import { Button ,FormControl,Input} from '@material-ui/core';

export class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pk: this.props.data.pk,
      username: this.props.data.username,
      email:this.props.data.email,
      first_name: this.props.data.first_name,
      last_name: this.props.data.last_name,
      showForm: false
      }
      
  }

  handleOnChange = e => {
    if (e.target.name === 'first_name') {
      this.setState({first_name: e.target.value});
    } if (e.target.name === 'last_name') {
      this.setState({ last_name: e.target.value }
      );
    } 
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append('first_name',this.state.first_name);
    form_data.append('last_name' ,this.state.last_name);
    form_data.append('pk', this.state.pk);
    form_data.append('username', this.state.username);
    this.props.editUserInfo(form_data,()=>{this.props.getUserInfo()})
    this.setState({
      showForm: false
    })
  }

  showForm = () => {
    return (<div>
      <form onSubmit={this.handleSubmit} >
        <FormControl>
          <label >first name</label>
          <Input
            type='text'
            name='first_name'
            value={this.state.first_name}
            onChange={this.handleOnChange}
            placeholder="first_name" /><br />
        </FormControl><br/>
         <FormControl>
          <label>Last_Name</label>
          <Input
            type='text'
            name='last_name'
            value={this.state.last_name}
            onChange={this.handleOnChange}
            placeholder="last name" /><br />
        </FormControl>
        <br />
        
        <Button type='submit' onClick={this.handleSubmit} variant="contained" color="secondary">
          Update Profile
        </Button>
 
      </form>
    </div>
    );
  }

  render() {
    return (
      <div>
         <Button type="button" variant="contained" color="primary" startIcon={<EditIcon />}
          onClick={() => this.setState({ showForm: true })}>
          Edit
        </Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null, {editUserInfo,getUserInfo})(EditUserInfo)
