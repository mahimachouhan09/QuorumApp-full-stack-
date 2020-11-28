import React, { Component } from 'react'
import { Link} from "react-router-dom";
import Answer from './Answer'
import { getQuestions } from '../actions/index'
import { connect } from 'react-redux';
import Comment from './Comment';
import SearchQuestion from './SearchQuestion';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';
import DeleteQuestion from './DeleteQuestion';
import EditQuestion from './EditQuestion';
import EditAnswer from './EditAnswer';
import DeleteAnswer from './DeleteAnswer';
import {Button} from '@material-ui/core'
import 'font-awesome/css/font-awesome.css'


class Question extends Component {

  componentDidMount() {
    const { isAuthenticated } = this.props.authlogin
    if(isAuthenticated){
    this.props.getQuestions()}
  }

  render() {
    const { questions } = this.props.questionsreducer
    const { pk } = this.props.authlogin.user

    return (
      <div>
        <h4 style={{ color:'#002984', fontsize: "large" ,margin:"25px"}}>Welcome to Quorum!.</h4> 
        <SearchQuestion />
        <p>But for now, why don't you answer or ask some questions!</p>

          <Link style={{ color: 'white' }} to = {`/askquestions`}>
              <Button variant="contained" color="primary" >Ask Question </Button>
          </Link>

          <Link style={{ color: 'white' }} to = {`/viewprofiles`}>
              <Button variant="contained" color="primary"> View Profiles </Button>
          </Link>

        <ul className= 'feed-block-ul'>
          {questions.map((value ,index) => ( 
            <li className ='feed-block-li' key = { index }>
              <span className="date">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                {value.pub_date}</span>
              <span className="question">
              <i className="fa fa-thumb-tack" aria-hidden="true"></i>    
              <span className="question-text">{value.question}</span> </span><br/> 
              <span className="question">description : {value.description}</span><br/> 
              <span className="question">{value.asked_by} &nbsp;&nbsp;&nbsp;</span>
              <br/>   
              <Answer id={value.id}/>

              <ul className="answer-comment-ul">
                {value.answers.map((item,index)=>(
                  <li className="answer-comment-ul-li"  key = { index }>
                    answer : {item.content}<br/>
                    <span>
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    answered_date : {item.answered_date}</span>

                    {/* item.user is the userid which gives answer to the question
                    and pk is the id of the user which is logged in*/}

                    {(pk === item.user)? 
                      <span><DeleteAnswer id={item.id} /><EditAnswer data={item}/> </span>:
                      <p></p>
                    }
                    comments: {item.comments_count}<br/><Comment answerId={item.id}/>
                    <ul >
                    {item.comments.map((comment,index)=>(
                      <li key = { index }>
                        comments : {comment.comment} 

                    {/* comment.user is the userid through which the comment has been done
                    and pk is the id of the user which is logged in*/}

                    {(pk === comment.user)? 
                      <span><DeleteComment id={comment.id} /><EditComment data={comment}/> </span>:
                      <p></p>
                    }
                    </li>
                    ))}
                    </ul>
                  </li>
                ))}<hr/>
              </ul>

                {/* value.user is the userid through which the question was created and 
                pk is the id of the user which is logged in*/}

              {(pk === value.user)? 
                <span><DeleteQuestion id={value.id} /><EditQuestion data={value}/> </span>:
                <p></p>}<br/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ authlogin, questionsreducer  }) => {
  return { 
    authlogin,
    questionsreducer
  }
}

export default connect(mapStateToProps, { getQuestions })( Question);