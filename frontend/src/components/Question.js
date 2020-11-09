import React, { Component } from 'react'
import { Link} from "react-router-dom";
import Answer from './Answer'
import { getQuestions } from '../actions/index'
import { connect } from 'react-redux';
// import ReactPaginate from 'react-paginate'
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
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0
    };
  }

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
      { questions.map((value ,index)=> ( 
            <li classname ='feed-block-li' key = { index }>       
              asked by : userid {value.user}<br/>   
              question : {value.question}<br/>              
              pub_date : {value.pub_date}<br/>   
              description : {value.description}
              <Answer id={value.id}/>
              <div>
                {value.answers.map((item,index)=>(
                <li key = { index }>
                  answer : {item.content}<br/>
                  answered_date : {item.answered_date}<br/>
                  {(pk === value.user)? 
                    <p><DeleteAnswer id={item.id} /><EditAnswer data={item}/> </p>:
                    <p></p>
                  }
                  comments_count : {item.comments_count}<br/><Comment answerId={item.id}/>

                  {item.comments.map((comment,index)=>(
                    <li key = { index }>
                      comments : {comment.comment}
                      
                    {(pk === comment.user)? 
                    <p><DeleteComment id={comment.id} /><EditComment data={comment}/> </p>:
                    <p></p>}
                    </li>
                  ))
                  }
                </li>
              ))}<hr/>
              </div>
            
              {(pk === value.user)? 
                <p><DeleteQuestion id={value.id} /><EditQuestion data={value}/> </p>:
                <p></p>}
            </li>
      ))
      }
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