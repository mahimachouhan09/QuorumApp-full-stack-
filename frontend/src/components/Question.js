import React, { Component } from 'react'
import {Redirect, Link} from "react-router-dom";
import Answer from './Answer'
import { getQuestions } from '../actions/index'
import { connect } from 'react-redux';
import Navbar from './Navbar';
import ReactPaginate from 'react-paginate'
import AskQuestion from './AskQuestion';

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
    // const { isAuthenticated } = this.props.authlogin
    const { questions } = this.props.questionsreducer
    console.log(questions)
      // if ( isAuthenticated ){
      //   return <Redirect to='/questions'/>
      //   }
    return (
      <div> 
      <h4>Welcome to Quorum!.</h4> 
      <Navbar />
      <p>But for now, why don't you answer or ask some questions!</p>
      <Link style={{ marginRight: '5px', color: 'white' }} to={`/question/answer`}>
          <button style={{ backgroundColor: '#009933', borderColor: '#009933' }}>
            Answer Questions<Answer />
          </button>
      </Link>
      <Link style={{ color: 'white' }} to = {`/askquestions`}>
          <button style={{ backgroundColor: '#b92b27', borderColor: '#b92b27' }}>
            Ask Question 
          </button>
      </Link>

      <ul>
      { questions.map((value ,index)=> ( 
            <li key = { index }>       
              asked by : {value.user}<br/>   
              question : {value.question}
              pub_date : {value.pub_date}   
              description  : {value.description}
              <div>
                {value.answers.map((item,index)=>(
                <li>
                  answer : {item.content}
                </li>  
              ))}
              </div>
            </li>      
           
      ))
      }
      </ul>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return ({
//     questionsreducers: state.questionsreducers
//   })
// }
const mapStateToProps = ({ authlogin, questionsreducer  }) => {
  return { 
      authlogin,
      questionsreducer
  }
}   

export default connect(mapStateToProps, { getQuestions })( Question);
