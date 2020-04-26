import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Segment} from 'semantic-ui-react';
 
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
			    			this.setState({content: selected.content});
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
			       <p><center>{this.state.content}</center></p>
		       </React.Fragment>
	    );
	  }
}
 
export default Entries;