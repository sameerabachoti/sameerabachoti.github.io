import React from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class NewEntry extends React.Component {
	

	render() {
		
		const genderOptions = [
			  { key: 'm', text: 'Male', value: 'male' },
			  { key: 'f', text: 'Female', value: 'female' },
			  { key: 'o', text: 'Other', value: 'other' },
			]
		return(
				<Container>
		        <Form onSubmit={this.handleSubmit}>
		          <FormGroup>
		            <Label for="title">Title</Label>
		            <Input type="text" name="title" id="title" value='title'
		                   onChange={this.handleChange} autoComplete="title"/>
		          </FormGroup>
		          <FormGroup>
		            <Label for="entry">Entry</Label>
		            <Input type="textarea" name="entry" id="entry" value='Enter something here...'
		                   onChange={this.handleChange} autoComplete="content"/>
		          </FormGroup>
		          <FormGroup>
		            <Button color="primary" type="submit">Save</Button>{' '}
		            <Button color="secondary" to="/groups">Cancel</Button>
		          </FormGroup>
		        </Form>
		      </Container>
		)
	}
	
}

export default NewEntry;