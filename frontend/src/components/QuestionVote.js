import React, { Component } from 'react'
import { connect } from 'react-redux'
import {voteQuestion,updateQuestionVote,deleteQuestionVote,getQuestions} from '../actions/index'

export class QuestionVote extends Component {

  handleVote(vote){
    const values = {
      question: this.props.data.id,
      user: this.props.pk,
      vote: vote
    }
    this.props.voteQuestion(values,()=>{this.props.getQuestions()})
  }

  handleUpdateVote = (vote, id) => {
    const values = {
      question: this.props.data.id,
      user: this.props.pk,
      vote: vote
    }
    this.props.updateQuestionVote(id, values,()=>{this.props.getQuestions()})
  }

  handleDeleteVote = (id) => {
    this.props.deleteQuestionVote(id,()=>{this.props.getQuestions()})
  }


  render() {
    const vote = this.props.data.vote.find((vote) => this.props.pk === vote.user)
    
    return (
      <React.Fragment>
        {!vote && <div>
          <button onClick={() => this.handleVote(true)}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
          {this.props.data.upvote_count}<br/>

          <button onClick={() => this.handleVote(false)}>
            <i className="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
          {this.props.data.downvote_count}
        </div>
        }

        {vote && <div>
          {vote.vote && <div>
            <button style={{color:"red"}} onClick={() => this.handleDeleteVote(vote.id)}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
          {this.props.data.upvote_count}<br/>

          <button onClick={() => this.handleUpdateVote(false, vote.id)}>
            <i  className="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
          {this.props.data.downvote_count}
          </div>}

          {!vote.vote && <div>
            <button onClick={() => this.handleUpdateVote(true, vote.id)}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
          {this.props.data.upvote_count}

          <button style={{color:"red"}} onClick={() => this.handleDeleteVote(vote.id)}>
            <i color="red" className="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
          {this.props.data.downvote_count}
            </div>}

        </div>
        }
      </React.Fragment>
    )
  }
}

export default connect(null,{
  voteQuestion,updateQuestionVote,deleteQuestionVote,getQuestions})(QuestionVote)
