import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FetchAllPosts from "./FetchAllPosts";
// import FetchAllAuthors from './fetchallauthors';

function App() {
  return (
    <div className="App">
      <FetchAllPosts  authorId="5ee7484e1d8e766f6353c41b"/>
    </div>
  );
}

export default App;
