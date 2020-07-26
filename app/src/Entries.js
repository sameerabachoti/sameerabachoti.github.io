import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Segment, Button, Icon} from 'semantic-ui-react';
import { withRouter, Router, Switch, Route } from 'react-router-dom';
import Entry from './Entry';
import NewEntry from './NewEntry';
import { Link } from 'react-router-dom';

class Entries extends React.Component {
	
	  constructor(props) {
	    super(props);
	    this.state = {entries: [], user: [], isLoading: true};
	    this.routeChange = this.routeChange.bind(this);
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
		    
	    this.setState({isLoading: true});
	    fetch('api/entries')
	      .then(response => response.json())
	      .then(data => this.setState({entries: data, isLoading: false}));
	  }
	  
	  routeChange() {
		    this.setState({isNewEntry: true});
		    this.setState({isEntry: false});
		    let path = `/newEntry`;
		    this.props.history.push(path);
	  }
	  
	  logout = () => {
		    fetch('/api/logout', {method: 'POST', credentials: 'include',
		      headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
		      .then(response => {
		        window.location.href = response.logoutUrl + "?id_token_hint=" +
		          response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
		      });
	  }
	  
	  render() {
		const entryList = this.state.entries;
		console.log(this.state.entries);
		const userName = this.state.user.given_name;
		
		const titleStyle = {
				'font-family': 'system-ui',
				'font-size': '40px',
				'text-transform': 'uppercase',
				'margin-left': '625px',
				'text-decoration': 'none'
		}
		
		const userNameStyle = {
				'font-family': 'system-ui',
				'font-size': '20px',
				'margin-left': '625px'	
		}
		
		const logoutStyle = {
				'margin-left': "1300px",
				'margin-top': "-50px",
				'cursor': "pointer"
		}
		
	    return (
	    	   <React.Fragment>
	    	        <div><a href='/' style={titleStyle}>Inspire</a><p style={logoutStyle} onClick={this.logout}>Logout</p></div>
	    	        <p style={userNameStyle}>Welcome {userName}!</p>
		    		<SideNav
			    		onSelect={(selected) => {
			    			if(selected){
			    				this.setState({id: selected.id, content: selected.content, title: selected.title, category: selected.category.name, date: selected.dateCreated, id: selected.id});
			    				this.setState({isNewEntry: false});
			    				this.setState({isEntry: true});
			    			}
			    		}}
		    		>
		    	    <SideNav.Toggle />
		    	    {this.state.entries.map(entry => 
			    	    <SideNav.Nav defaultSelected={entry}>
			    	        <NavItem eventKey={entry}>
			    	            <NavIcon>
			    	                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
			    	            </NavIcon>
			    	            <NavText>
			    	                {entry.title}
			    	            </NavText>
			    	        </NavItem>
			    	    </SideNav.Nav>
		    	    )}
		    	    <SideNav.Nav>
		    	    	<NavItem>
		    	    		<NavIcon>
    	                		<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
    	                	</NavIcon>
		    	    		<NavText>
		    	    			<button onClick={this.routeChange} style={{color: 'black', cursor: 'pointer'}}>Add Entry</button>
		    	    		</NavText>
		    	    	</NavItem>
		    	    </SideNav.Nav>
			       </SideNav>
			       {this.state.isEntry && <Entry
			    	   	id={this.state.id}
			       		content={this.state.content}
			       		category={this.state.category}
			       		title={this.state.title}
			       		dateCreated={this.state.date}
			       />}
			       {this.state.isNewEntry && <NewEntry />}
		       </React.Fragment>
	    );
	  }
}
 
export default withRouter(Entries);