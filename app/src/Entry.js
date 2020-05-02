import React from 'react';
import {Segment, Header, Container, Divider} from 'semantic-ui-react';

class Entry extends React.Component {
	render (){
		const { category, content, title, dateCreated } = this.props;
		return(
			<React.Fragment>
				<Container fluid textAlign="center">
					<center>
					<Header as="h3">{title}</Header>
					<Segment>{dateCreated}</Segment>
					<Segment>{category}</Segment>
					<br />
					<Segment>{content}</Segment>
					</center>
				</Container>
			</React.Fragment>
		);
	}
}

export default Entry;