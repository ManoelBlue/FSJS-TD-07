import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';

import './App.css';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c1a7b8328a70800df44145bf3795806&safe_search=sunsets&per_page=&format=json&nojsoncallback=1&auth_token=72157718237004357-cb69c906d6263a9c&api_sig=8647980d163903d9c7491b238b8b9c21`)
            .then(response => console.log(response.data.photos.photo))
            .catch(error => console.log(error));
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
