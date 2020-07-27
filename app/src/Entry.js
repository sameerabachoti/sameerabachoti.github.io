import React from 'react';
import {Segment, Header, Container, Divider} from 'semantic-ui-react';
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

class Entry extends React.Component {
	
	async remove(id) {
	   console.log("remove id ", id);
	    await fetch(`/api/entry/${id}`, {
	      method: 'DELETE',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      }
	    }).then(() => {
	      console.log("done");
	    });
	    window.location.reload(false);
	}
	
	render (){
		const { id, category, content, title, dateCreated } = this.props;
		
		const contentStyle = {
				'font-family': 'Georgia'
		}
		
		const entryStyle = {
				'background-color': '#DEB887',
				'padding-bottom': '350px',
				'padding-left': '10px',
				'width': '50%',
				'margin-left': '300px',
				'box-shadow': '5px 5px 2px grey'
		}
		
		const buttonStyle = {
				'margin-left': '300px',
				'margin-top': '11px',
		}
		
		const titleStyle = {
				'text-transform': 'capitalize'
		}
		return(
			<React.Fragment>
				<Container fluid textAlign="center">
				<div style={entryStyle}>
					<Header as="h3" style={titleStyle}>{title}</Header>
					<Segment>{dateFormat(dateCreated, "mmmm dS, yyyy")}</Segment>
					<Segment style={titleStyle}>{category}</Segment>
					<br />
					<Segment style={contentStyle}>{content}</Segment>
					<center>
					<br />
					</center>
				</div>
				<ButtonGroup style={buttonStyle}>
		            <Button size="sm" color="secondary" tag={Link} to={"/entry/" + id}>Edit</Button>
		            <Button size="sm" color="dark" onClick={() => this.remove(id)}>Delete</Button>
	            </ButtonGroup>
				</Container>
			</React.Fragment>
		);
	}
}

export default Entry;