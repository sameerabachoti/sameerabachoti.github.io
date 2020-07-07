import { withRouter, Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';

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

	login() {
	    let port = (window.location.port ? ':' + window.location.port : '');
	    if (port === ':3000') {
	      port = ':8080';
	    }
	    window.location.href = '//' + window.location.hostname + port + '/private';
	}

	render(){
		return(
			<React.Fragment>
				<center>
			        <Button size="lg" color="primary" tag={Link} to={"/register"}>Register</Button>{'  '}
			        <Button size="lg" color="danger" onClick={this.login}>Login</Button>
				</center>
			</React.Fragment>
		);
	}
}

export default withCookies(Home);