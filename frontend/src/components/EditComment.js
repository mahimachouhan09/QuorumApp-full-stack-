import React, { Component } from 'react'

export class EditComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      CommentData :{
        "id": 5,
        "comment": "comment on 17",
        "created_on": "2020-10-20T14:02:38.931926Z",
        "user": 2,
        "answer": 7
    }
    
    }
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default EditComment
