import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users  from "./components/Users";
import Login from "./components/Login";
import Question from "./components/Question";
import AskQuestion from './components/AskQuestion'


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <div>
        <nav>
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
          </ul>
        </nav>
        <Switch>
          <Route path="/users"  ><Users /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/questions">
            <Question /></Route>
          <Route exact path="/askquestion">
            <AskQuestion />
          </Route>
          <Route path='/questions/:questionId' component={Question}/>
          {/* <Route path='/questions' component={Questions}/> */}
        </Switch>
      </div>
    </Router>
      </header>
    </div>
  );
}

export default App;
