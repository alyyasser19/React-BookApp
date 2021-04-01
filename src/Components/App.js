import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as BooksAPI from '../API/BooksAPI'
import "../Styles/App.css";
import Search from "./search"
import BookShelf from "./BookShelf"

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    Books: [],
    queryResult:[]
  };

  search=(query)=>{
    BooksAPI.search(query).then(res=>{


    })
  }

  updateBooks = (book,state)=>{
    BooksAPI.update(book, state).then((books) => {
 BooksAPI.getAll().then((books) => {
   this.setState({
     Books: books,
   });
   this.setLists(this.state.Books);
 });
    });
  }

  

  setLists=(books)=> {
    let wantToRead = [];
    let read = [];
    let currentlyReading= [];

    books.map((book) => {
      if (book.shelf === "wantToRead")
        wantToRead.push(book)
      if (book.shelf === "currentlyReading")
        currentlyReading.push(book)
      if (book.shelf === "read")
        read.push(book);
      return book;
    });
    this.setState({
      wantToRead: wantToRead,
      currentlyReading: currentlyReading,
      read: read
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        Books: books,
      });
      this.setLists(this.state.Books);
    });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/search">
              <Search
                key="Search"
                search={this.search}
                update={this.updateBooks}
              />
            </Route>
            {/*Seprate*/}
            <Route path="/" exact>
              <BookShelf
                key="BookShelf"
                currentlyReading={this.state.currentlyReading}
                wantToRead={this.state.wantToRead}
                read={this.state.read}
                update={this.updateBooks}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
