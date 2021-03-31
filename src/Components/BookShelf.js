import React from 'react';
import { Link } from "react-router-dom";
import Book from "./Book"

const BookShelf = (props) => {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {props.currentlyReading.map((book) => (
                      <li>
                        <Book key={book.id} book={book} update={props.update} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {props.wantToRead.map((book) => (
                      <li>
                        <Book key={book.id} book={book} update={props.update} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {props.read.map((book) => (
                      <li>
                        <Book key={book.id} book={book} update={props.update} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <nav>
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    );
}

export default BookShelf;
