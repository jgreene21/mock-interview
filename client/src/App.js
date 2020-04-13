import React from 'react';
import './App.css';
import { Card, Image, Icon, } from "semantic-ui-react";
import axios from 'axios';

class App extends React.Component {
  state = { items: []}

  componentDidMount() {
    axios.get('/api/items')
      .then(res => this.setState({ items: res.data, }))
  }

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { name, image, description, likes } = this.state;
  //   axios.post('api/items', { name })
  //     .then( ({ data })) => {
  //       this.setState({ })
  //     }
  // }


render(){
  const { items, } = this.state 
  return (
    <div>
    <h1>All Items</h1>
    <hr/> 
    <Card.Group itemsPerRow={4}>
    { items.map( item =>
      <Card key={item.id}>
        <Image src={item.avatar} />
        <Card.Content>
          <Card.Header>
            { item.name }
          </Card.Header>
          <Card.Meta>
            { item.description }
          </Card.Meta>
          <Card.Content extra>
        <a>
          <Icon name='user' />
          {item.likes}
        </a>
    </Card.Content>
        </Card.Content>
      </Card>
    )}
  </Card.Group>
  </div>
  )
    }
};


export default App;
