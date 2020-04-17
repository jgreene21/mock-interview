import React from 'react';
import './App.css';
import { Card, Image, Icon, Container, } from "semantic-ui-react";
import axios from 'axios';
import styled from 'styled-components';
import ItemForm from './ItemForm.js';

class App extends React.Component {
  state = { items: []}

  componentDidMount() {
    axios.get('/api/items')
      .then( (res) => {
        this.setState({ items: res.data, })
      })
      .catch( (err) => {
        console.log(err)
      })
  }
  addItem = (itemName, itemImage, itemDescription, itemLikes) => {
    axios
    .post('/api/items', { 
      name: itemName,
      image: itemImage,
      description: itemDescription,
      likes: itemLikes, 
    })
    .then( (res) => {
      this.setState({
        items: [
          { ...res.data, item_id: res.data.id, items: [] },
          ...this.state.items
        ]
      });
    })
    .catch(e => {
      console.log(e);
    });
};

render(){
  const { items, } = this.state
        return (
          <AppContainer>
            <Container>
   <br/>
    <h1 style={styles.Header}>Lonely Hearts Club</h1>
          <br />
          
      <Card.Group itemsPerRow={4}>
        { items.map( item =>
          <Card key={item.id} style={styles.cardPosition}>
            <Image src={item.image} />
            <Card.Content>
              <Card.Header>
                { item.name }
              </Card.Header>
              <Card.Meta>
                { item.description}
              </Card.Meta>
              <Card.Content extra style={styles.iconPosition}>
                <Icon name="heart" color="red" /> {item.likes}
            </Card.Content>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
      <ItemForm/>
      
      </Container>
      </AppContainer>
    )
  }
}

const styles = {
  iconPosition: {
    float:"right",
    position: "absolute",
    bottom: "0",
    right: "0",
    clear: "right",
    paddingRight: "5%"
  },
  cardPosition: {
    marginRight: "10px",
  },
  Header: {
    textAlign: "center",
    fontSize: "30px",
    color: "#FFFFFF",
    fontFamily: "cursive",
    
  }
};

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, pink, purple);
`;

export default App;
