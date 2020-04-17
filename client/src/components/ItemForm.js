import React from 'react';
import { Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

class ItemForm extends React.Component {
  state = {
    name:'',
    image: '',
    description: '',
    likes: '', 
  }
 
  componentDidMount(){
    if(this.props.id === undefined){
      //do nothing
    } else {
      this.getItems()
    }
  }
  
  getItems = async() => {
  
    const res = await axios.get(
      `/api/items/${this.props.id}`
    );
  
    this.setState({
      name: res.data.name,
      image: res.data.image,
      description: res.data.description, 
      likes: res.data.likes, 
    });
  }

  handleChange= (e, {name, value}) =>{
    this.setState({
      [name]:value
    })
  }
  
  clearState = () =>{
    this.setState({
    name: '',
    image: '',
    description: '',
    likes: '',
    })
  }

  handleSubmit = () =>{

    if (this.props.id === undefined ){
    axios
      .post(`/api/items`, this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      this.props.toggleForm()
    } else{
      axios
        .put(`/api/items/${this.props.id}`, this.state)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        this.props.toggleForm()
    }
   
  }

  render(){
    const { name, image, description, likes} = this.state
    return(
      <>
      <Modal.Content>
      <Form onSubmit={this.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        
           <Form.Input
          label="image"
          placeholder="Image"
          name="image"
          value={image}
          onChange={this.handleChange}
          />
           <Form.Input
          label="Likes"
          placeholder="Likes"
          name="likes"
          value={likes}
          onChange={this.handleChange}
          />
          </Form.Group>
          <Form.TextArea
          label="Description"
          placeholder="Description"
          name="description"
          value={description}
          onChange={this.handleChange}
          />
          <br/>
        <Form.Button type="submit">Submit</Form.Button>
      
    </Form>
    </Modal.Content>
    </>
    )
  }
}

export default ItemForm; 