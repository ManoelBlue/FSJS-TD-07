import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-route-dom';

import './App.css';
import apiKey from './config';
import SearchForm from './components/SearchForm';

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SearchForm></SearchForm>
          <Route></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
