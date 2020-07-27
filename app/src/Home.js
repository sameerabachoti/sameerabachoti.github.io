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
		const buttonStyle = {
				'padding-left': '35px',
				'padding-right': '35px',
		}
		
		const titleStyle = {
			'font-family': 'system-ui',
			'font-size': '60px',
			'text-transform': 'uppercase',
			'padding': '100px 610px 20px'
		}
		
		const backgroundStyle = {
				'background-color': '#00BFFF',
				'padding-bottom': '700px'
		}
		
		const captionStyle = {
				'font-family': 'system-ui',
				'font-size': '18px',
				'padding-left': '550px',
				'padding-bottom': '20px',
				'font-style': 'italic'
		}
		
		const logoutStyle = {
				'cursor': "pointer",
				'margin-left': '1350px'
		}
		
		const imgStyle = {
				'width': '20%',
				'margin-left': '570px',
				'margin-bottom': '20px',
				'border-radius': '8px'
		}
		
		
		return(
			<body style={backgroundStyle}>
				<React.Fragment>
				{this.state.isAuthenticated ? <p style={logoutStyle} onClick={this.logout}>Logout</p> : ''}
				<div style={titleStyle}>Inspire</div>
				<img style={imgStyle} src={require('./coffee.jpg')} alt="coffee" />
				<div style={captionStyle}>A place to record your thoughts and ideas.</div>
				{this.state.isAuthenticated ?
					<div>
					   <center><Button size="lg" style={buttonStyle} tag={Link} to={"/entries"}>See your journal now!</Button></center>
					</div> :
			   <center><Button style={buttonStyle} size="lg" onClick={this.login}>Login</Button></center>}
				
			   </React.Fragment>
		   </body>
		);
	}
}

export default withCookies(Home);