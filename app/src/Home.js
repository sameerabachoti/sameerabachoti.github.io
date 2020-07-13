import { withRouter, Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import './App.css'; 

class Home extends React.Component {
	state = {
	    isLoading: true,
	    isAuthenticated: false,
	    user: undefined
	};

	constructor(props) {
		super(props);
	    const {cookies} = props;
	    this.state.csrfToken = cookies.get('XSRF-TOKEN');
	    this.login = this.login.bind(this);
	}
	
	async componentDidMount() {
	    const response = await fetch('/api/user', {credentials: 'include'});
	    const body = await response.text();
	    console.log("body ", body);
	    if (body === '') {
	      this.setState(({isAuthenticated: false}))
	    } else {
	      this.setState({isAuthenticated: true, user: JSON.parse(body)})
	    }
	}

	login = () => {
	    let port = (window.location.port ? ':' + window.location.port : '');
	    if (port === ':3000') {
	      port = ':8080';
	    }
	    window.location.href = '//' + window.location.hostname + port + '/private';
	}
	
	logout = () => {
	    fetch('/api/logout', {method: 'POST', credentials: 'include',
	      headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
	      .then(response => {
	        window.location.href = response.logoutUrl + "?id_token_hint=" +
	          response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
	      });
	  }

	render(){
		return(
			<React.Fragment>
			{this.state.isAuthenticated ?
				<div>
				   <center><Button color="danger" onClick={this.logout}>Logout</Button></center>
				</div> :
		   <center><Button size="lg" color="success" onClick={this.login}>Login</Button></center>}
		   </React.Fragment>
		);
	}
}

export default withCookies(Home);