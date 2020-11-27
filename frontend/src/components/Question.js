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
import Typography from '@material-ui/core/Typography';
import {Button} from '@material-ui/core'

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
        <h4>Welcome to Quorum!.</h4> 
        <SearchQuestion />
        <p>But for now, why don't you answer or ask some questions!</p>

        <Typography >
          <Link style={{ color: 'white' }} to = {`/askquestions`}>
              <Button variant="contained" color="primary" >Ask Question </Button>
          </Link>

          <Link style={{ color: 'white' }} to = {`/viewprofiles`}>
              <Button variant="contained" color="primary"> View Profiles </Button>
          </Link>
        </Typography>
        <ul className= 'feed-block-ul'>
          {questions.map((value ,index) => ( 
            <li className ='feed-block-li' key = { index }>
              question : {value.question}<br/>&nbsp;
              description : {value.description}<br/> 
              asked by : userid {value.user} &nbsp;         
              pub_date : {value.pub_date}<br/>   
              <Answer id={value.id}/>
              <ul>
                {value.answers.map((item,index)=>(
                  <li key = { index }>
                    answer : {item.content}<br/>
                    answered_date : {item.answered_date}<br/>
                    {(pk === item.user)? 
                      <span><DeleteAnswer id={item.id} /><EditAnswer data={item}/> </span>:
                      <p></p>
                    }
                    comments_count : {item.comments_count}<br/><Comment answerId={item.id}/>
                    <ul>
                    {item.comments.map((comment,index)=>(
                      <li key = { index }>
                        comments : {comment.comment} 
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
                
              {(pk === value.user)? 
                <span><DeleteQuestion id={value.id} /><EditQuestion data={value}/> </span>:
                <p></p>}<br/>
                question id: {value.id}
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