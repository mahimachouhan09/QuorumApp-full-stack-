import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route ,Redirect} from "react-router-dom";
import Users  from "./components/Users";
import Login from "./components/Login";
import Question from "./components/Question";
import AskQuestion from './components/AskQuestion'
import Answer from './components/Answer'
import {connect} from 'react-redux'
import { logout } from './actions/index'
import Navbar from './components/Navbar';
import Profile from './components/Profile'
import Follow from './components/Follow'
import Follower from './components/Follower'
import EditProfile from './components/EditProfile'

function App(props) { 
  const { isAuthenticated } = props
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <div>
        <Navbar />
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
            <li>
            <div>
              <a href="#" onClick={props.logout}>LOGOUT</a>
              </div>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route path="/users"  ><Users /></Route>
          <Route path="/login"><Login /></Route>
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
          
          <Route path="/viewprofiles" 
          render={() => {
            if (isAuthenticated) {
              return <Profile {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}>
          </Route>

          <Route path="/update-profile/:id/" 
          render={() => {
            if (isAuthenticated) {
              return <EditProfile {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}>
          </Route>

          <Route path="/follow/id" 
          render={() => {
            if (isAuthenticated) {
              return <Follow {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}>
          </Route>

          <Route exact path="/followers/:id" 
          // key={this.props.id.key}
          render={() => {
            if (isAuthenticated) {
              return <Follower {...props} 
              // key={this.props.id.key}
              />;
            } else {
              return <Redirect to="/login" />;
            }
          }}>
          </Route>

          {/* <Route path='/questions' component={Questions}/> */}
        </Switch>
      </div>
    </Router>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authlogin :state.authlogin,
    isAuthenticated: state.authlogin.token ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
