import axios from "axios";

export default {
  getBooksGoogle: function(query) {
    const link = "https://www.googleapis.com/books/v1/volumes?q="+query
    return axios.get(link);
  },
  getBooks: function() {
    return axios.get("/api/books");
  },
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
