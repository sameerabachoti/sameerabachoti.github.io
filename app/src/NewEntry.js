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
		    category: {name: ''}
	};
	
	constructor(props) {
	    super(props);
	    this.state = {
	    	entry: this.emptyEntry,
	    };
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	async handleSubmit(event) {
	    event.preventDefault();
	    const {entry} = this.state;

	    await fetch('/api/entry', {
	      method: (entry.id) ? 'PUT' : 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(entry),
	    });
	    this.props.history.push('/');
	 }
	
	handleChange(event) {
		console.log("event ", event.target.value);
		const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    console.log("name ", name);
	    let entry = {...this.state.entry};
	    //let category = {...this.state.category};
	    entry[name] = value;
	    if(name=='category'){
	    	entry[name] = {name: value}
	    }
	    console.log("entry ", entry);
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