import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Segment, Button, Icon} from 'semantic-ui-react';
import { withRouter, Router, Switch, Route } from 'react-router-dom';
import Entry from './Entry';
import NewEntry from './NewEntry';

class Entries extends React.Component {
	
	  constructor(props) {
	    super(props);
	    this.state = {entries: [], isLoading: true};
	    this.routeChange = this.routeChange.bind(this);
	  }

	  componentDidMount() {
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
	  
	  render() {
		const entryList = this.state.entries;
		console.log(this.state.entries);
	    return (
	    	   <React.Fragment>
		    		<SideNav
			    		onSelect={(selected) => {
			    			console.log('selected ', selected);
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
		    	    			<button onClick={this.routeChange} style={{color: 'black'}}>Add Entry</button>
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