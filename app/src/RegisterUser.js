import React from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class RegisterUser extends React.Component {
	emptyUser = {
		    email: '',
		    password: ''
	};
	
	constructor(props) {
	    super(props);
	    this.state = {
	    	user: this.emptyUser,
	    };
	}
	
	render() {
		const {user} = this.state;
		return(
				<Container>
				<h2>Register</h2>
		        <Form onSubmit={this.handleSubmit}>
		          <FormGroup>
		            <Label for="email">Email</Label>
		            <Input type="text" name="email" id="email" value={user.email|| ''}
		                   onChange={this.handleChange} autoComplete="email"/>
		          </FormGroup>
		          <FormGroup>
		            <Label for="password">Password</Label>
		            <Input type="text" name="password" id="passwprd" value={user.password || ''}
		                   onChange={this.handleChange} autoComplete="title"/>
		          </FormGroup>
		          <FormGroup>
		            <Button color="primary" type="submit">Save</Button>{' '}
		            <Button color="secondary" to="/">Cancel</Button>
		          </FormGroup>
		        </Form>
		      </Container>
		)
	}
	
}

export default withRouter(RegisterUser);