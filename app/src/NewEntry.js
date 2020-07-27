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
	    	errors: {
	            title: '',
	            category: '',
	            content: '',
	          }
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
	    	console.log("entry response ", entryResponse);
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
	    window.location.reload(false);
	 }
	
	handleChange(event) {
		const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    let entry = {...this.state.entry};
	    let errors = this.state.errors;
	    
	    entry[name] = value;
	    if(name=='category'){
	    	errors.category = value === '' ? 'Category is required' : '';
	    	entry[name] = {name: value}
	    }
	    else if(name == 'title'){
	    	errors.title = value === '' ? 'Title is required' : '';
	    }
	    else if(name == 'content'){
	    	errors.content = value === '' ? 'Entry is required' : '';
	    }
	    
	    this.setState({errors, [name]: value});
	    this.setState({entry});
	}
	
	render() {
		const {entry} = this.state;
		const {errors} = this.state;
		let isDisabled = errors.title || errors.category || errors.content;
		
		const divStyle = {
				'margin-left': '300px', 
				'border-style': 'solid',
				'border-width': '1px',
				'padding-left': '20px', 
				'padding-bottom': '350px',
				'border-radius': '10px'
		};
		
		const error = {
			'font-size': '15px',
			'color': 'red'
		}
		
		return(
				<Container>
		         <Form onSubmit={this.handleSubmit} style={divStyle}>
		          <FormGroup>
		            <Label for="title">Title</Label>
		            <Input type="text"style={{width: "500px"}} name="title" id="title" value={entry.title || ''}
		                   onChange={this.handleChange} autoComplete="title"/>
		            <span style={error}>{errors.title}</span>
		          </FormGroup>
		          <FormGroup>
		            <Label for="category">Category</Label>
		            <Input type="text" style={{width: "500px"}} name="category" id="category" value={entry.category.name || ''}
		                   onChange={this.handleChange} autoComplete="title"/>
		            <span style={error}>{errors.category}</span>
		          </FormGroup>
		          <FormGroup>
		            <Label for="content">Entry</Label>
		            <Input type="textarea" style={{width: "500px", height: "100px"}} name="content" id="content" value={entry.content || ''}
		                   onChange={this.handleChange} autoComplete="content"/>
		            <span style={error}>{errors.content}</span>
		          </FormGroup>
		          <FormGroup>
		            <Button color="primary" type="submit" disabled={isDisabled}>Save</Button>{' '}
		            <Button color="secondary" to="/">Cancel</Button>
		          </FormGroup>
		        </Form>
		      </Container>
		)
	}
	
}

export default withRouter(NewEntry);