import React, { Component } from "react";
import ReactDOM from 'react-dom';
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";

class Search extends Component {
    state = {
      books: [],
      search: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.getBooksGoogle(this.state.search)
        .then(res=>{
            console.log(res.data.items)
            this.setState({ books: res.data.items, search: ""})
        })
        .catch(err => console.log(err));
    };

    render() {
        return (
          <Container fluid>
            <Row>
              <Col size="md-6">
                <Jumbotron>
                  <h1>Search for books</h1>
                </Jumbotron>
                <form>
                  <Input
                    value={this.state.search}
                    onChange={this.handleInputChange}
                    name="search"
                    placeholder="Search for"
                  />
                  <FormBtn disabled={!(this.state.search)}onClick={this.handleFormSubmit}>
                    Search
                  </FormBtn>
                </form>
              </Col>
              <Col size="md-6 sm-12">
                <Jumbotron>
                  <h1>Search result</h1>
                </Jumbotron>
                {this.state.books.length ? (
                  <List>
                    {this.state.books.map(book => (
                      <ListItem key={book.id}>
                            <div>
                                <strong>
                                    {book.volumeInfo.title} by {book.volumeInfo.authors}
                                <br />
                                <a href={book.volumeInfo.infoLink}>View</a>
                                <br />
                                <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Book" />
                                </strong>
                            </div>
                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row>
          </Container>
        )
    }
}
export default Search;