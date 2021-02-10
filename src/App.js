import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.css';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {
    constructor() {
        super()
    }

    render() {
        return (
        <BrowserRouter>
            <div className="container">
                <SearchForm></SearchForm>
                <Nav></Nav>

                <Switch>
                    <Route exact path="/" component={() => <PhotoContainer data={'empty'} />}></Route>
                    <Route path="/cats" component={() => <PhotoContainer data={'Cats'} />}></Route>
                    <Route path="/dogs" component={() => <PhotoContainer data={'Dogs'} />}></Route>
                    <Route path="/computers" component={() => <PhotoContainer data={'Computers'} />}></Route>
                    <Route path="/search" component={() => <PhotoContainer data={'Search'} />}></Route>
                    <Route component={() => <PhotoContainer data={'NotFound'} />}></Route>
                </Switch>
            </div>
        </BrowserRouter>
        );
    }
}

export default App;
