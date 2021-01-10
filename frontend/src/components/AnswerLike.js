import React, { Component } from 'react'
import { connect } from 'react-redux'
import {voteAnswer,updateAnswerVote,deleteAnswerVote,getQuestions} from '../actions/index'

export class QuestionVote extends Component {

  handleVote(vote){
    const values = {
      vote: vote,
      user: this.props.pk,
      answer: this.props.data.id,
    }
    this.props.voteAnswer(values,()=>{this.props.getQuestions()})
  }

  handleUpdateVote = (vote, id) => {
    const values = {
      vote: vote,
      user: this.props.pk,
      answer: this.props.data.id,
    }
    this.props.updateAnswerVote(id, values,()=>{this.props.getQuestions()})
  }

  handleDeleteVote = (id) => {
    this.props.deleteAnswerVote(id,()=>{this.props.getQuestions()})
  }


  render() {
    const answervote = this.props.data.answervote.find((answervote) => this.props.pk === answervote.user)
    
    return (
      <div style={{display:"flex",paddingTop:"13px"}}>
        {!answervote && <div>
          <button className="question-upvote" onClick={() => this.handleVote(true)}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
          {this.props.data.answer_upvote_count}

          <button className="question-upvote" style={{color:"red"}} onClick={() => this.handleVote(false)}>
            <i className="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
          {this.props.data.answer_downvote_count}
        </div>
        }

        {answervote && <div>
          {answervote.vote && <div>
            <button className="question-upvote" onClick={() => this.handleDeleteVote(answervote.id)}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
          {this.props.data.answer_upvote_count}

          <button className="question-upvote" style={{color:"red"}} onClick={() => this.handleUpdateVote(false,answervote.id)}>
            <i  className="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
          {this.props.data.answer_downvote_count}
          </div>}

          {!answervote.vote && <div>
            <button className="question-upvote" onClick={() => this.handleUpdateVote(true, answervote.id)}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
          {this.props.data.answer_upvote_count}

          <button className="question-upvote" style={{color:"red"}} onClick={() => this.handleDeleteVote(answervote.id)}>
            <i color="red" className="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
          {this.props.data.answer_downvote_count}
            </div>}

        </div>
        }

      </div>
    )
  }
}

export default connect(null,{voteAnswer,updateAnswerVote,deleteAnswerVote,getQuestions})(QuestionVote)
