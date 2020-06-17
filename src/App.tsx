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
      </Switch>
    </div>
  );
}

export default App;
