import React, { Component } from 'react'
import { connect } from 'react-redux'
import {voteQuestion,updateQuestionVote,deleteQuestioneVote} from '../actions/index'

export class QuestionVote extends Component {

  handleVote(vote){
    const values = {
      question: this.props.data.id,
      user: this.props.pk,
      vote: vote
    }
    this.props.voteQuestion(values)
  }

  handleUpdateVote = (vote, id) => {
    const values = {
      question: this.props.data.id,
      user: this.props.pk,
      vote: vote
    }
    this.props.updateQuestionVote(id, values)
  }

  handleDeleteVote = (id) => {
    this.props.deleteQuestioneVote(id)
  }


  render() {
    const vote = this.props.data.vote.find((vote) => this.props.pk === vote.user)
    
    return (
      <div>
        {!vote && <div>
          <button onClick={() => this.handleVote(true)}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
          {this.props.data.upvote_count}

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
          {this.props.data.upvote_count}

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

      </div>
    )
  }
}

export default connect(null , {voteQuestion,updateQuestionVote, deleteQuestioneVote})(QuestionVote)
