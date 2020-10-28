import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editComment,getQuestions} from '../actions/index'

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
            }
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange = e => {
      if (e.target.name === 'comment') {
        this.setState({ commentData :{
          ...this.state.commentData ,comment: e.target.value} });
      } 
    }
  
    handleSubmit = async(event) => {
        event.preventDefault();
        console.log(this.props.data)
        await this.props.editComment(this.props.data.id, this.state.commentData)
        await this.props.getQuestions()
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
                <button>UPDATE COMMENT</button>
            </form>
        </div>
        );
    }


    render() { 
        return (
            <div>
                <button type="button" onClick={() => this.setState({ showForm: true })}>Edit Comment</button>
                {this.state.showForm ? this.showForm() : null}
            </div>
        )
    }
}

export default connect(null, {editComment,getQuestions})(EditComment);
