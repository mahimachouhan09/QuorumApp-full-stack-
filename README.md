# quorum app 
<<<<<<< HEAD
 The objective of quorum app is to connect people with each other to search for their query(questions) and users among them can provide multiple answers to it and  comment on it.Creating an Rest Api Endpoint for this.

# Features 
- User authentication and authorization
- User can create and update profile
- User can ask Question
- User can Answer questions
- User can comment on answer
- Search questions asked by specific user
=======
 The objective of quorum app is to connect people with each other to search for their query(questions) and users among them can provide multiple answers to it.Creating an Rest Api Endpoint for this.

# Features 
- User authentication and authorization
- User profile
- User can choose intrested topics
- User can ask Question
- User can Answer questions
- User can Upvote, DownVote questions and answers
- User can comment on answer
- Follow and Unfollow(User)
- Search based on topic 
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e

# Technology-Used
- python,
- django rest framework
- reactjs+redux
- database :- mysql

## How to use:
  - `pip install -r requirements.txt`
  - `python manage.py runserver`
  
<<<<<<< HEAD
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
=======
## URLs to target:
  - to register a user
    - localhost:8000/users
  - to login a user
    - localhost:8000/api/auth/login
  - to logout a user
    - localhost:8000/api/auth/logout
  - to change password
    - localhost:8000/api/auth/password_change
  - to forget password
    - localhost:8000/^password/reset/$
  - to update the user profile
    - localhost:8000/profile-update/
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
  - to view following
    - localhost:8000/following/id/
  - to view followers
    - localhost:8000/followers/id/

<<<<<<< HEAD
## Useful commands for backend :
=======
## Useful commands:
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
  - `python manage.py createsuperuser`
  - `python manage.py makemigrations`
  - `python manage.py migrate`

<<<<<<< HEAD
## Useful commands for frontend : 
  - run using `npm start`
  - `python manage.py makemigrations`

=======
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
# Future scope of the project
In future, this project can be extend by adding the feature of chat application and user can get
notification for their activities .Also there is the scope of payment gateway for viewing answers,
users can request another members to answer his/her questions. User can save particular Q/A
for future reference.
<<<<<<< HEAD

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
=======
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
