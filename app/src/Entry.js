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
		return(
			<React.Fragment>
				<Container fluid textAlign="center">
					<center>
					<Header as="h3">{title}</Header>
					<Segment>{dateFormat(dateCreated, "mmmm dS, yyyy")}</Segment>
					<Segment>{category}</Segment>
					<br />
					<Segment>{content}</Segment>
					</center>
					<center>
					<br />
					<ButtonGroup>
			            <Button size="sm" color="primary" tag={Link} to={"/entry/" + id}>Edit</Button>{' '}
			            <Button size="sm" color="danger" onClick={() => this.remove(id)}>Delete</Button>
		            </ButtonGroup>
					</center>
				</Container>
			</React.Fragment>
		);
	}
}

export default Entry;