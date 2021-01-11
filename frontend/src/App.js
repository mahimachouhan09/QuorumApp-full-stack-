import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route ,Redirect} from "react-router-dom";
import Login from "./components/Login";
import Question from "./components/Question";
import AskQuestion from './components/AskQuestion'
import Answer from './components/Answer'
import {connect} from 'react-redux'
import { logout } from './actions/index'
import NavigationBar from './components/NavigationBar';
import Profile from './components/Profile'
import Follow from './components/Follow'
import Follower from './components/Follower'
import Following from './components/Following'
import EditProfile from './components/EditProfile'
import ForgetPassword from './components/ForgetPassword'
import ChangePassword from './components/ChangePassword'
import Signup from './components/Register'
import UserInfo from './components/UserInfo'
import CreateProfile from './components/CreateProfile'
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from './components/Footer';
import ListFavoriteQuestion from './components/ListFavoriteQuestion';

function App(props) { 
  const { isAuthenticated } = props
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <div>
        <NavigationBar />
        <Switch>
          <Route path="/signup" >
            <Signup />
          </Route>

          <Route path="/login"><Login /></Route>
          <Route exact path="/"><Login /></Route>

          <Route path="/questions"  
            render={() => {
              if (isAuthenticated) {
                return <Question {...props} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          >
          </Route>

          <Route path="/askquestions">
            <AskQuestion />
          </Route>

          <Route path='/questions/:questionId' component={Question}/>
          <Route path="/question/:questionId/answer">
            <Answer />
          </Route>

          <Route path="/viewprofiles" 
            render={() => {
              if (isAuthenticated) {
                return <Profile {...props} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}>
          </Route>
          
          <Route path="/changepassword" 
            render={() => {
              if (isAuthenticated) {
                return <ChangePassword {...props} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}>
          </Route>

          <Route path="/forgetpassword" >
            <ForgetPassword />
          </Route>

          <Route path="/update-profile/:id/" 
          render={() => {
            if (isAuthenticated) {
              return <EditProfile {...props}  />;
            } else {
              return <Redirect to="/login" />;
            }
          }}>
          </Route>

          <Route path="/user-info" 
          render={() => {
            if (isAuthenticated) {
              return <UserInfo />;
            } else {
              return <Redirect to="/user-info" />;
            }
          }}>
          </Route>

          <Route path="/createprofile" 
          render={() => {
            if (isAuthenticated) {
              return <CreateProfile />;
            } else {
              return <Redirect to="/user-info" />;
            }
          }}>
          </Route>

          <Route exact path="/followers/:id" 
            render={() => {
              if (isAuthenticated) {
                return <Follower {...props} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}>
          </Route>

          <Route exact path="/following/:id" 
            render={() => {
              if (isAuthenticated) {
                return <Following {...props} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}>
          </Route>

          <Route exact path="/follow/:id" 
            render={() => {
              if (isAuthenticated) {
                return <Follow {...props} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}>
          </Route>

          <Route path="/favourite-questions" 
            render={() => {
              if (isAuthenticated) {
                return <ListFavoriteQuestion {...props} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}>
          </Route>

        </Switch>
      </div>
    </Router>
      </header>
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authlogin :state.authlogin,
    isAuthenticated: state.authlogin.token ? true : false,
  };
};

const mapDispatchToProps = () => {
  return {
    logout
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
