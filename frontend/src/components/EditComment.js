import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {editComment,getQuestions} from '../actions/index'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

class EditComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: {
                id: this.props.data.id,
                comment: this.props.data.comment,
                created_on: this.props.data.created_on,
                user:this.props.data.user ,
                answer: this.props.data.answer
            },
            showForm: false
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange = e => {
      if (e.target.name === 'comment') {
        this.setState({ commentData :{
          ...this.state.commentData ,comment: e.target.value} });
      } 
    }
  
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.editComment(this.props.data.id, this.state.commentData,()=>{this.props.getQuestions()})
        this.setState({
            showForm: false
        })
    }
    showForm = () => {
        return (<div>
            <form onSubmit={this.handleSubmit} >
                <label>Comment</label>
                <input type='text'
                    name='comment'
                    value={this.state.commentData.comment}
                    onChange={this.handleOnChange}
                /><br />
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick = {this.handleSubmit}
                >
                    UPDATE COMMENT
                </Button>
            </form>
        </div>
        );
    }


    render() { 
        return (
            <Fragment>
                <Button 
                    type="button" 
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => this.setState({ showForm: true })}>
                    Edit Comment
                </Button>
                    {this.state.showForm ? this.showForm() : null}
            </Fragment>
        )
    }
}

export default connect(null, {editComment,getQuestions})(EditComment);
