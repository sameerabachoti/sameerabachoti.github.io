import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
 
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
	         

	    		<SideNav>
	    	    <SideNav.Toggle />
	    	    {this.state.entries.map(entry => 
		    	    <SideNav.Nav defaultSelected={entry.title}>
		    	        <NavItem eventKey={entry.title}>
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
	    	 
	    );
	  }
}
 
export default Entries;