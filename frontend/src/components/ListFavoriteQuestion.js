import React, { Component } from 'react'
import {connect} from 'react-redux'
import {listFavoriteQuestion} from '../actions/index'

export class ListFavoriteQuestion extends Component {
  
  componentDidMount() {
    const { isAuthenticated } = this.props.authlogin
    if(isAuthenticated){
    this.props.listFavoriteQuestion()}
  }

  render() {
    const { favquestions } = this.props.listFavQuesReducer
    const { profiles } = this.props.profilereducer
    return (
      <div className="fav-question-list">
        {console.log(favquestions,profiles)}
        <ul className= 'feed-block-ul'>
          {favquestions.length>0 ? favquestions.map((value ,index) => {
             return ( 
              <li className ='feed-block-li' key={ index }>
                <span className="question">
                <span className="fav-question-text">{value.question}</span> </span><br/>
              </li> 
           
            )
          }):<div className="no-results">No fav questions found <br/> Go to QuestionList</div>}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ authlogin,profilereducer,listFavQuesReducer}) => {
  return { 
    authlogin,
    profilereducer,
    listFavQuesReducer
  }
}

export default connect(mapStateToProps, { listFavoriteQuestion })(ListFavoriteQuestion)
