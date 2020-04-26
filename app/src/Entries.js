import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Segment} from 'semantic-ui-react';
import Entry from './Entry';
 
class Entries extends React.Component {
	
	  constructor(props) {
	    super(props);
	    this.state = {entries: [], isLoading: true};
	  }

	  componentDidMount() {
	    this.setState({isLoading: true});
	    console.log("component did mount");
	    fetch('api/entries')
	      .then(response => response.json())
	      .then(data => this.setState({entries: data, isLoading: false}));
	  }
	  
	  render() {
		const entryList = this.state.entries;
		console.log(this.state.entries);
	    return (
	    	   <React.Fragment>
		    		<SideNav
			    		onSelect={(selected) => {
			    			console.log('selected ', selected);
			    			this.setState({content: selected.content, title: selected.title, date: selected.dateCreated});
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
			       </SideNav>
			       <Entry
			       		content={this.state.content}
			       		title={this.state.title}
			       		dateCreated={this.state.date}
			       />
		       </React.Fragment>
	    );
	  }
}
 
export default Entries;