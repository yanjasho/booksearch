import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import PoweredByGoogle from "../components/PoweredByGoogle"
import Alert from "../components/Alert"
import DeleteBtn from "../components/DeleteBtn";

class Search extends Component {
    
    state = {
      books: [],
      search: "",
      alert: false
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
          this.setState({ books: res.data.items, search: "", alert: false})
      })
      .catch(err => console.log(err));
    };

    saveBook = bookData => {
      API.saveBook(bookData)
      .then(res => {
        this.setState({alert: true})
      })
      .catch(err => console.log(err));
    };

    render() {
        return (
          <Container fluid>
            <Row>
              <Col size="md-6">
                <Jumbotron>
                  <h1>Search Books</h1>
                </Jumbotron>
                <Alert style={{ opacity: this.state.alert ? 1 : 0 }} type="success" >
                  Book Saved
                  <DeleteBtn onClick={() => this.setState({alert: false})} />
                </Alert>
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
                  <PoweredByGoogle />
                </form>
              </Col>
              <Col size="md-6 sm-12">
                <Jumbotron>
                  <h1>Google Books search results</h1>
                </Jumbotron>
                {this.state.books.length ? (
                  <List>
                    {this.state.books.map(book => (
                      <ListItem key={book.id}>
                            <div>
                              <strong>
                                  {book.volumeInfo.title} by {book.volumeInfo.authors}
                              <br />
                              </strong>
                              <a href={book.volumeInfo.infoLink}>View</a>
                              <p>{book.volumeInfo.description}</p>
                              <br />
                              <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Book" />
                            </div>
                        <SaveBtn onClick={() => this.saveBook(book.volumeInfo)} />
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