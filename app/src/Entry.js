import React from 'react';
import {Segment, Header, Container} from 'semantic-ui-react';

class Entry extends React.Component {
	render (){
		const { content, title, dateCreated } = this.props;
		return(
			<React.Fragment>
				<Container>
					<center>
					<Header as="h3">{title}</Header>
					<Segment>{dateCreated}</Segment>
					<br />
					<Segment>{content}</Segment>
					</center>
				</Container>
			</React.Fragment>
		);
	}
}

export default Entry;