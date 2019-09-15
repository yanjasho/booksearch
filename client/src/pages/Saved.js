import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import PoweredByGoogle from "../components/PoweredByGoogle"

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
    .then(res =>
        this.setState({ books: res.data})
      )
    .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
    .then(res => this.loadBooks())
    .catch(err => console.log(err));
  };    

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>Saved Books</h1>
        </Jumbotron>
        {this.state.books.length ? (
          <List>
            {this.state.books.map(book => (
              <ListItem key={book._id}>
                <div>
                  <strong>
                    {book.title} by {book.authors}
                    <br />
                  </strong>
                  <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  <a href={book.link}>View </a>
                  <Row>
                    <Col size="sm-4">  
                      <img src={book.image} alt="Book" />
                    </Col>
                    <Col size="lg">
                      <p>{book.description}</p>
                    </Col>
                  </Row>
                </div>
              </ListItem>
            ))}
            
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
          <PoweredByGoogle />
      </Container>
    );
  }
}

export default Saved;