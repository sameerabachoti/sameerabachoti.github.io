import React, { Component } from 'react';
import './App.css';
import Entries from './Entries';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Entries}/>
        </Switch>
      </Router>
    )
  }
}

export default App;