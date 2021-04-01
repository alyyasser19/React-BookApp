import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/App.css";
import Book from "./Book"
import * as BooksAPI from "../API/BooksAPI";

export default function Search(props) {
  
  const [query,setQuery]= useState('');
  const [res, setRes] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (e)=> {
    setQuery(e.target.value)
    if (e.target.value.length > 0) {
      BooksAPI.search(e.target.value).then((res) => {
               BooksAPI.getAll().then((books) => {
                 res.forEach((book) => {
                   books.forEach((shelf) => {
                     if (book.id === shelf.id) {
                       book.shelf = shelf.shelf;
                       return;
                     }
                   });
                   if (typeof book.shelf === "undefined") {
                     book.shelf = "none";
                   }
                 });
               });
        if (res.error) setError(true);
        else {
          setRes(res);
          setError(false);
        }
      });
    } else if (e.target.value==='') {
      setRes([])
    } 
  }

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <nav>
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
          </nav>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" value={query} onChange={handleChange} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
                {
                  error && error ? <h1>No Results</h1> : 
                  res.map(book=>{
                  return(<ul key={book.id}>
                      <Book key={book.id} book={book} update={props.update} />
                    </ul>)
                }
                  )}              
               
        </div>
      </div>
    </div>
  );
}
