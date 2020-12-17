import React, { Component } from 'react'
import { connect } from 'react-redux'
import {editQuestion,getQuestions} from '../actions/index'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';


export class MarkfavQues extends Component {
  
  handleFav(fav){
    const values = {
      is_favorite:fav,
      user: this.props.pk,
      question : this.props.data.question
    }
    this.props.editQuestion(this.props.data.id, values,()=>{this.props.getQuestions()})
  }

  render() {
    return (
      <div>
        {this.props.data.is_favorite===true && 
        <button className="MarkfavQues" onClick={() => this.handleFav(false)}>
          <StarOutlinedIcon/>
        </button>
        }
        {this.props.data.is_favorite===false &&
        <button className="MarkfavQues" onClick={() => this.handleFav(true)}>
          <StarBorderOutlinedIcon/>
        </button>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ authlogin }) => {
  return { 
      authlogin,
  }
}

export default connect(mapStateToProps,{ editQuestion,getQuestions})(MarkfavQues)
