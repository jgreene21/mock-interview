import React from 'react';
import './App.css';
import { Card, Image, Icon, Container, Button, Modal} from "semantic-ui-react";
import axios from 'axios';
import styled from 'styled-components';
import ItemForm from './components/ItemForm.js';

class App extends React.Component {
  state = { items: [], likes: [], newForm: false}

  componentDidMount(){
    this.getItems()
  };

  getItems = async() => {
    const res = await axios.get(`/api/items/`);
    this.setState({
      items: res.data
    });
}

toggleForm = () => {
  this.setState({
     newForm: !this.state.newForm
  });
};

sortAscending = () => {
  const { items, likes } = this.state;
  likes.sort((a, b) => a - b)    
  this.setState({ likes })
}

sortDescending = () => {
  const { items, likes } = this.state;
  likes.sort((a, b) => a - b).reverse()
  this.setState({ likes })
}

render(){
  const { items, } = this.state
        return (
          <AppContainer>
            <Container >
   <br/>
    <h1 style={styles.Header}>Lonely Hearts Club</h1>
          <br />
          <div align="right">
          <p>Filter by</p>
         <button onClick={this.sortAscending}>Most Likes</button>
        <button onClick={this.sortDescending}>Least Likes</button>
          </div>
          <br/>
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
      <br/>
      <div align="center">
      <Button onClick={this.toggleForm}>New Profile</Button>
        <Modal open={this.state.newForm} close={this.toggleForm}>
          <ItemForm toggleForm={this.toggleForm} />
          </Modal>
      </div>
      <br/>
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
