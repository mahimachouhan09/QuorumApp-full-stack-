# quorum app 
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

# Technology-Used
- python,
- django rest framework
- reactjs+redux
- database :- mysql

## How to use:
  - `pip install -r requirements.txt`
  - `python manage.py runserver`
  
## URLs to target:
  - to register a user
    - localhost:8000/api/auth/register
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

## Useful commands:
  - `python manage.py createsuperuser`
  - `python manage.py makemigrations`
  - `python manage.py migrate`

# Future scope of the project
In future, this project can be extend by adding the feature of chat application and user can get
notification for their activities .Also there is the scope of payment gateway for viewing answers,
users can request another members to answer his/her questions. User can save particular Q/A
for future reference.