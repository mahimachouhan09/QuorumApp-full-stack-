# quorum app 
 The objective of quorum app is to connect people with each other to search for their query(questions) and users among them can provide multiple answers to it and  comment on it.Creating an Rest Api Endpoint for this.

# Features 
- User authentication and authorization
- User can create/update and view profile
- User can ask Question
- User can Answer questions
- User can comment on answer
- Search questions
- User can Upvote, DownVote questions and answers
- User can like/dislike comments on answer
- User has image support on posting answer
- User can mark/unmark favourite questions

# Technology-Used
- python,
- django rest framework
- reactjs+redux
- database :- mysql

## How to use:
  - `pip install -r requirements.txt`
  - `python manage.py runserver`
  
## URLs to target for backend:
  - Basic route
    - http://127.0.0.1:8000/ 
  - to register a user
    - localhost:8000/rest-auth/registration/
  - to login a user
    - localhost:8000/rest-auth/login/
  - to logout a user
    - localhost:8000/rest-auth/logout
  - to change password
    - localhost:8000/rest-auth/password/change/
  - to forget password
    - localhost:8000/password/reset/
  - to update the user firstname/lastname
    - localhost:8000/rest-auth/user/,
  - to update the user profile
    - localhost:8000/profile/,
  - to view following
    - localhost:8000/following/id/
  - to view followers
    - localhost:8000/followers/id/
  - to mark/unmark favourite question
    - localhost:8000/favorite-questions/
  - to upvote/downvote question
    - localhost:8000/questionvote/
  - to upvote/downvote answer
    - localhost:8000/answervote/
  - to like/dislike comment
    - localhost:8000/commentvote/

## Useful commands for backend :
  - `python manage.py createsuperuser`
  - `python manage.py makemigrations`
  - `python manage.py migrate`

## Useful commands for frontend : 
  - run using `npm start`

# Future scope of the project
In future, this project can be extend by adding the feature of chat application and user can get
notification for their activities .Also there is the scope of payment gateway for viewing answers,
users can request another members to answer his/her questions. User can save particular Q/A
for future reference.

# structure of the project
├── frontend
│ 	├── node_modules
│ 	├── package.json
│ 	├── package-lock.json
│ 	├── public
│ 	│   ├── favicon.ico
│ 	│   ├── index.html
│ 	│   ├── logo192.png
│ 	│   ├── logo512.png
│ 	│   ├── manifest.json
│ 	│   └── robots.txt
│ 	├── README.md
│ 	├── src
│ 	│   ├── actions
│ 	│   │   ├── actionTypes.js
│ 	│   │   └── index.js
│ 	│   ├── app
│ 	│   │   └── store.js
│ 	│   ├── App.css
│ 	│   ├── App.js
│ 	│   ├── App.test.js
│ 	│   ├── components
│ 	│   │   ├── Answer.js
│ 	│   │   ├── AskQuestion.js
│ 	│   │   ├── ChangePassword.js
│ 	│   │   ├── Comment.js
│ 	│   │   ├── DeleteAnswer.js
│ 	│   │   ├── DeleteComment.js
│ 	│   │   ├── DeleteQuestion.js
│ 	│   │   ├── EditAnswer.js
│ 	│   │   ├── EditComment.js
│ 	│   │   ├── EditProfile.js
│ 	│   │   ├── EditQuestion.js
│ 	│   │   ├── Follower.js
│ 	│   │   ├── Following.js
│ 	│   │   ├── Follow.js
│ 	│   │   ├── ForgetPassword.js
│ 	│   │   ├── Login.js
│ 	│   │   ├── Navbar.js
│ 	│   │   ├── Profile.js
│ 	│   │   ├── Question.js
│ 	│   │   ├── Register.js
│ 	│   │   ├── SearchQuestion.js
│ 	│   │   ├── SuccessfullSignup.js
│ 	│   │   └── UserInfo.js
│ 	│   ├── features
│ 	│   ├── index.css
│ 	│   ├── index.js
│ 	│   ├── profile_pics
│ 	│   ├── reducers
│ 	│   │   ├── answerreducer.js
│ 	│   │   ├── authlogin.js
│ 	│   │   ├── commentreducer.js
│ 	│   │   ├── forgetpassword.js
│ 	│   │   ├── index.js
│ 	│   │   ├── profilereducer.js
│ 	│   │   ├── questionsreducer.js
│ 	│   │   └── registerreducer.js
│ 	│   ├── serviceWorker.js
│ 	│   ├── setupTests.js
│ 	│   └── utility
│ 	│       └── index.js
│ 	└── yarn.lock
├── package-lock.json
├── quorumapi
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   │   ├── __init__.py
│   │   └── __pycache__
│   ├── models.py
│   ├── paginators.py
│   ├── permissions.py
│   ├── __pycache__
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── quorumproject
│   ├── __init__.py
│   ├── __pycache__
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── README.md
└── requirements.txt