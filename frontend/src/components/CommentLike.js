import React, { Component } from 'react'
import { connect } from 'react-redux'
import {likeComment,updateCommentLike,deleteCommentLike,getQuestions} from '../actions/index'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export class CommentLike extends Component {

  handleLike(like){
    const values = {
      like: like,
      user: this.props.pk,
      comment: this.props.data.id,   
    }
    this.props.likeComment(values,()=>{this.props.getQuestions()})
  }

  handleUpdateLike = (like, id) => {
    const values = {
      like: like,
      user: this.props.pk,
      comment: this.props.data.id, 
    }
    this.props.updateCommentLike(id, values,()=>{this.props.getQuestions()})
  }

  handleDeleteLike = (id) => {
    this.props.deleteCommentLike(id,()=>{this.props.getQuestions()})
  }


  render() {
    const commentlike = this.props.data.commentlike.find((like) => this.props.pk === like.user)
    return (
      <div>
        {!commentlike && <div>
          <ThumbUpAltOutlinedIcon onClick={() => this.handleLike(true)}>
          </ThumbUpAltOutlinedIcon>
          {this.props.data.like_count}

          <ThumbDownAltOutlinedIcon onClick={() => this.handleLike(false)}>
         </ThumbDownAltOutlinedIcon>
          {this.props.data.dislike_count}
        </div>
        }

        {commentlike && <div>
          {commentlike.like && <div>
            <ThumbUpAltIcon style={{color:"red"}} onClick={() => this.handleDeleteLike(commentlike.id)}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </ThumbUpAltIcon>
            {this.props.data.like_count}
            <ThumbDownIcon onClick={() => this.handleUpdateLike(false,commentlike.id)}>
              <i  className="fa fa-arrow-down" aria-hidden="true"></i>
            </ThumbDownIcon>
            {this.props.data.dislike_count}
          </div>}

          {!commentlike.like && <div>
            <ThumbUpAltIcon onClick={() => this.handleUpdateLike(true,commentlike.id)}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </ThumbUpAltIcon>
            {this.props.data.like_count}

            <ThumbDownIcon style={{color:"red"}} onClick={() => this.handleDeleteLike(commentlike.id)}>
              <i color="red" className="fa fa-arrow-down" aria-hidden="true"></i>
            </ThumbDownIcon>
            {this.props.data.dislike_count}
          </div>}
        </div>
        }
      </div>
    )
  }
}

export default connect(null , {likeComment,updateCommentLike,deleteCommentLike,getQuestions})(CommentLike)
