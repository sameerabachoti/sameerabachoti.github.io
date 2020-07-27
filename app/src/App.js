import React, { Component } from 'react';
import './App.css';
import Entries from './Entries';
import NewEntry from './NewEntry';
import RegisterUser from './RegisterUser';
import LoginUser from './LoginUser';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
  render() {
    return (
	     <CookiesProvider>
		      <Router>
		        <Switch>
		          <Route path='/' exact={true} component={Home}/> 
		          <Route path='/entries' exact={true} component={Entries}/> 
		          <Route path='/newEntry' exact={true} component={Entries}/>
		          <Route path='/entry/:id' exact={true} component={NewEntry}/>
		          <Route path='/register' exact={true} component={RegisterUser}/>
		          <Route path='/login' exact={true} component={LoginUser}/>
		        </Switch>
		      </Router>
	     </CookiesProvider>
    )
  }
}

export default App;