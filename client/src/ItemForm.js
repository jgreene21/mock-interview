import React from 'react';
import {Form, Header, Button} from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';


class ItemForm extends React.Component {
  state = {
    name:'',
    image: '',
    description: '',
    likes: '', 
  }
 
  componentDidMount() {
    if (this.props.id) {
      this.setState({name: this.props.name})
    } 
  }

  handleChange = (e) => {
    console.log(e)
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    this.addItem(this.state)
    this.setState({
      name: '',
      image: '',
      description: '',
      likes: '',
    })
  }


  render(){
    const { name, image, description, likes} = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          fluid 
          required
          label="Name"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid 
          required
          label="Description"
          placeholder="Description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          />
           <Form.Input
          fluid 
          required
          label="image"
          placeholder="Image"
          name="image"
          value={this.state.image}
          onChange={this.handleChange}
          />
           <Form.Input
          fluid 
          required
          label="Likes"
          placeholder="Likes"
          name="likes"
          value={this.state.likes}
          onChange={this.handleChange}
          />
          <br/>
        <Form.Button>Submit</Form.Button>
      </Form.Group>
    </Form>
    )
  }
}

export default ItemForm; 