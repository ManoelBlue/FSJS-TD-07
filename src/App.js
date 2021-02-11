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
            photos: []
        }
    }

    componentDidMount() {
        this.fetchData('cats');
    }

    fetchData(search) {
        let searchText = search.replace(/\s/gi, '+');
        let searchTag = search.replace(/\s/gi, '%2C');
        let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTag}&tag_mode=all&text=${searchText}&safe_search=3&content_type=1&per_page=24&format=json&nojsoncallback=1`;

        axios.get(url)
            .then(response => {
                this.setState({
                    photos: response.data.photos.photo
                })
            })
            .catch(error => console.error('Error fetching data', error));
    }

    render() {
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
