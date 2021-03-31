import React, { useState } from "react";

export default function Book(props) {
  const [value,setValue]= useState(props.book.shelf)
  
   const handleChange=(e)=>{
    setValue(e.target.value)
    props.update(props.book,e.target.value)
  }

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.book.imageLinks.thumbnail})`,
          }}></div>
        <div className="book-shelf-changer">
          <select value={value} onChange={handleChange}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
    </div>
  );
}