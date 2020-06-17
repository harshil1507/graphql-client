import React from 'react';
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FetchPosts from "./FetchAllPosts";
import FetchAllAuthors from './FetchAllAuthors';
import Aggregate from './aggregate'
import Populate from "./populate";
// import FetchAllAuthors from './FetchAllAuthors';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/">
          <FetchAllAuthors />          
        </Route>

        <Route exact path="/author/:id">
          <FetchPosts />
        </Route>
        
        <Route exact path="/aggregate">
          <Aggregate />
        </Route>

        <Route exact path="/populate">
          <Populate />
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
