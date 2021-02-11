import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';

import './App.css';
import apiKey, {secret} from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {
    constructor() {
        super()
        this.state = {
            photos: [],
        }
    }

    componentDidMount() {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3b8cf52d0dccbaa319e3079918057b36&safe_search=cats&per_page=&format=json&nojsoncallback=1&auth_token=72157718248197602-f8319b6f96d9013e&api_sig=77278637a3a58b2ff6fe13a56d220736`)
            .then(response => {
                this.setState({
                    photos: response.data.photos.photo
                })
            })
            .catch(error => console.error('Error fetching data', error));
    }

    render() {
        console.log(this.state.photos);

        return (
        <BrowserRouter>
            <div className="container">
                <SearchForm></SearchForm>
                <Nav></Nav>

                <Switch>
                    <Route exact path="/" render={() => <PhotoContainer data={this.state.photos} />}></Route>
                    <Route path="/cats" render={() => <PhotoContainer data={'Cats'} />}></Route>
                    <Route path="/dogs" render={() => <PhotoContainer data={'Dogs'} />}></Route>
                    <Route path="/computers" render={() => <PhotoContainer data={'Computers'} />}></Route>
                    <Route path="/search" render={() => <PhotoContainer data={'Search'} />}></Route>
                </Switch>
            </div>
        </BrowserRouter>
        );
    }
}

export default App;
