import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Todo from './components/Todo';
import Home from './components/Home';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
    <Router>
      <div>
      <Header/>
        <Route exact path="/todo" component={Home}/>
        <Route exact path="/todo/:id" component={Todo}/>
      </div>
    </Router>
    </div>
  );
}

export default App;

