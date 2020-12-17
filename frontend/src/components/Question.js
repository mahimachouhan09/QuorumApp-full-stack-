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
import QuestionVote from './QuestionVote';
import AnswerLike from './AnswerLike';
import CommentLike from './CommentLike';
import MarkfavQues from './MarkfavQues'
import {Button} from '@material-ui/core'
import 'font-awesome/css/font-awesome.css'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ReadMoreAndLess from 'react-read-more-less';

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
        <h4 className ="feedheading" > Welcome to Quorum!. </h4> 
        <SearchQuestion />
        <p className ='question-div-p'>But for now, why don't you answer or ask some questions!</p>

          <Link style={{ color: 'white' }} to = {`/askquestions`}>
              <Button style={{marginRight:"20px"}} variant="contained" color="primary" >Ask Question </Button>
          </Link>

          <Link style={{ color: 'white' }} to = {`/viewprofiles`}>
              <Button variant="contained" color="primary"> View Profiles </Button>
          </Link>

        <ul className= 'feed-block-ul'>
          { questions.length>0 ? questions.map((value ,index) => {
            const username = value && value.asked_by && value.asked_by.substring(14,value.asked_by.length-2)

          return ( 
            <li className ='feed-block-li' key = { index }>
              <span className="date">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                {value.pub_date_time}</span> 
              <div className="question">
                <QuestionVote data={value} pk={pk}/>
                {/* <i className="fa fa-thumb-tack" aria-hidden="true"></i>     */}
                <div className="question-text">{value.question}<br/>
                <h6 className ="question-username">{username}</h6><br/></div>
                {/* <div className ="question-description" >
                <h6 className ="description-heading">describe more: </h6>{value.description}</div><br/><br/>
                 */}
              </div><br/>
              <MarkfavQues data={value}/>
              {/* <div className ="question-username">
                <h6>{username}</h6></div>  */}
              <div className ="question-description" >
                <h6 className ="description-heading">describe more: </h6>{value.description}</div><br/><br/>
              <div><Answer id={value.id}/></div>

              { value && (value.answers && value.answers.length === 0?<p></p>:
                <h5 className="count">{value.answers_count} Answers</h5>)}
              
              <ul className="answer-ul">
                {value.answers && value.answers.map((item,index)=>{
                const user = item.username.substring(14,item.username.length-2)
                 
              return ( 
                  <li className="answer-ul-li" key = { index }>
                    <span style={{float:"left",textAlign:"left"}}>
                      <QuestionAnswerIcon /> 
                      <ReadMoreAndLess
                        charLimit={50}
                        readMoreText="Read more ▼"
                        readLessText="Read less ▲"
                      >
                        {item.content}
                      </ReadMoreAndLess>         
                      <br/>
                    </span>
                    <span className="date">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      {item.answered_date_time}
                      </span><br />
                      <div className ="question-username">
                      <h6>{user}</h6></div>

                      {item.photo &&  <div>
                        <img style ={{width:"500px",margin:"20px"}}src={item.photo } alt=""/>
                      </div>}
                     
                    {/* item.user is the userid which gives answer to the question
                    and pk is the id of the user which is logged in*/}

                    {(pk === item.user)? 
                      <div className="deleteanswer"><DeleteAnswer id={item.id} /><EditAnswer data={item}/> </div>:
                      <p></p>}
                      
                    <AnswerLike data={item} pk={pk}/>

                    {(item.comments_count === 0?<p></p>:
                    <h5 className="count">{item.comments_count} comments </h5>)}
                    <Comment answerId={item.id}/><br/>

                    <ul className = "comment-ul">
                    {item.comments.map((comment,index)=>(
                      <div className = "comment-ul-li" key = { index }>
                       <span>{comment.comment} </span>
                       <span className="date">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                        {comment.commented_date_time}</span>

                        <CommentLike data={comment} pk={pk}/>
                        
                    {/* comment.user is the userid through which the comment has been done
                    and pk is the id of the user which is logged in*/}

                    {(pk === comment.user)? 
                      <div className="deletequestion"><DeleteComment id={comment.id} /><EditComment data={comment}/> </div>:
                      <p></p>
                    }
                    </div>
                    ))}
                    </ul>
                  </li>
                )})}<hr/>
              </ul>

                {/* value.user is the userid through which the question was created and 
                pk is the id of the user which is logged in*/}

              {(pk === value.user)? 
                <div className="deletequestion"><DeleteQuestion id={value.id} /><EditQuestion data={value}/> </div>:
                <p></p>}<br/>
            </li>
          )}):<div className="no-results">No results found <br/> Go to QuestionList</div>}
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