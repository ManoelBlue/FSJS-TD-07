import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';

import './App.css';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';

class App extends Component {
    constructor() {
        super()
        this.state = {
            photos: [],
            query: '',
            loading: true
        }
    }

    //  Add data to eh state as component mounts:
    componentDidMount() {
        this.fetchData('nature');
    }

    // Method to fetch data from flickr api:
    fetchData = (search) => {
        let searchText = search.replace(/\s/gi, '+');
        let searchTag = search.replace(/\s/gi, '%2C');
        let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTag}&tag_mode=all&text=${searchText}&safe_search=3&content_type=1&per_page=24&format=json&nojsoncallback=1`;

        axios.get(url)
            .then(response => {
                this.setState({
                    photos: response.data.photos.photo,
                    loading: false
                })
            })
            .catch(error => console.error('Error fetching data', error));
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <SearchForm onSearch={this.fetchData} />
                    <Nav />

                    {
                        (this.state.loading)
                        ? <p>Loading...</p>
                        :
                            <Switch>
                                <Route exact path="/" render={() => <PhotoContainer data={this.state.photos} />}></Route>
                                <Route path="/:query" render={() => <PhotoContainer data={this.state.cats} />}></Route>
                                <Route path="/search/:query" render={() => <PhotoContainer data={this.state.search} />}></Route>
                                <Route component={NotFound} />
                            </Switch>
                    }
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
