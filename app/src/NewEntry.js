import React from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class NewEntry extends React.Component {
	
	emptyEntry = {
		    id: '',
		    title: '',
		    content: '',
		    dateCreated: '',
		    dateModified: '', 
		    category: {name: ''},
		    user: {id: '',
				firstName: '',
				lastName: '',
				email: ''}
	};
	
	constructor(props) {
	    super(props);
	    this.state = {
	    	entry: this.emptyEntry,
	    };
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	async componentDidMount() {
		const {entry} = this.state;
		entry.id = this.props.match.params.id;
		this.setState({entry});
	    const response = await fetch('/api/user', {credentials: 'include'});
	    const body = await response.text();
	    console.log("user ", body);
	    if (body === '') {
		    this.setState(({isAuthenticated: false}))
		} else {
		    this.setState({isAuthenticated: true, user: JSON.parse(body)})
		}
	    
	    if(entry.id){
	    	const entryDetails = await fetch(`/api/entry/${entry.id}`);
	    	const entryResponse = await entryDetails.text();
	    	if (entryResponse !== '') {
	    		this.setState({entry: JSON.parse(entryResponse)});
			} 
	    }
	}
	
	async handleSubmit(event) {
	    event.preventDefault();
	    const {entry} = this.state;
	    entry.user.firstName = this.state.user.given_name;
	    entry.user.lastName = this.state.user.family_name;
	    entry.user.email = this.state.user.email;
	    if(entry.id){
		    await fetch('/api/entry/:id', {
		      method: 'PUT',
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		      body: JSON.stringify(entry)
		    });
	    }
	    else{
	    	await fetch('/api/entry/', {   	
			    method: 'POST',
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
			    body: JSON.stringify(entry)
			 });
	    	
	    }
	    this.props.history.push('/entries');
	 }
	
	handleChange(event) {
		const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    let entry = {...this.state.entry};
	    entry[name] = value;
	    if(name=='category'){
	    	entry[name] = {name: value}
	    }
	    this.setState({entry});
	}
	
	render() {
		const {entry} = this.state;
		return(
				<Container>
		        <Form onSubmit={this.handleSubmit}>
		          <FormGroup>
		            <Label for="title">Title</Label>
		            <Input type="text" name="title" id="title" value={entry.title || ''}
		                   onChange={this.handleChange} autoComplete="title"/>
		          </FormGroup>
		          <FormGroup>
		            <Label for="category">Category</Label>
		            <Input type="text" name="category" id="category" value={entry.category.name || ''}
		                   onChange={this.handleChange} autoComplete="title"/>
		          </FormGroup>
		          <FormGroup>
		            <Label for="content">Entry</Label>
		            <Input type="textarea" name="content" id="content" value={entry.content || ''}
		                   onChange={this.handleChange} autoComplete="content"/>
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

export default withRouter(NewEntry);