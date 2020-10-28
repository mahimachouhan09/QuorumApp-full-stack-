import React, { Component } from 'react'
import { Link} from "react-router-dom";
import Answer from './Answer'
import { getQuestions } from '../actions/index'
import { connect } from 'react-redux';
// import Navbar from './Navbar';
// import ReactPaginate from 'react-paginate'
import Comment from './Comment';
import SearchQuestion from './SearchQuestion';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';

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
    console.log(isAuthenticated)
    if(isAuthenticated){
    this.props.getQuestions()}
  }

 
  render() {
  
    const { questions } = this.props.questionsreducer
    const { pk} = this.props.authlogin.user

    return (
      <div> 
      <h4>Welcome to Quorum!.</h4> 
      <SearchQuestion />
      <p>But for now, why don't you answer or ask some questions!</p>
      
      <Link style={{ color: 'white' }} to = {`/askquestions`}>
          <button>Ask Question </button>
      </Link>

      <Link style={{ color: 'white' }} to = {`/viewprofiles`}>
          <button> View Profiles </button>
      </Link>

      <ul>
      { questions.map((value ,index)=> ( 
            <li key = { index }>       
              asked by : userid {value.user}<br/>   
              question : {value.question}<br/>              
              pub_date : {value.pub_date}<br/>   
              description  : {value.description}
              <Answer id={value.id}/>
              <div>
                {value.answers.map((item,index)=>(
                <li key = { index }>
                  answer : {item.content}<br/><Comment answerId={item.id}/>
                  answered_date : {item.answered_date}<br/>
                  comments_count : {item.comments_count}<br/>

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