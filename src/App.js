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
        this.state = {
            photos: [],
            cats: [],
            dogs: [],
            computers: [],
            search: [],
            loading: true
        }
    }

    componentDidMount() {
        this.fetchData('nature', 'photos');
        this.fetchData('cats', 'cats');
        this.fetchData('dogs', 'dogs');
        this.fetchData('computers', 'computers');
    }

    fetchData = (search, stateName) => {
        let searchText = search.replace(/\s/gi, '+');
        let searchTag = search.replace(/\s/gi, '%2C');
        let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTag}&tag_mode=all&text=${searchText}&safe_search=3&content_type=1&per_page=24&format=json&nojsoncallback=1`;

        axios.get(url)
            .then(response => {
                this.setState({
                    [`${stateName}`]: response.data.photos.photo,
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
                                <Route path="/cats" render={() => <PhotoContainer data={this.state.cats} />}></Route>
                                <Route path="/dogs" render={() => <PhotoContainer data={this.state.dogs} />}></Route>
                                <Route path="/computers" render={() => <PhotoContainer data={this.state.computers} />}></Route>
                                <Route path="/search" render={() => <PhotoContainer data={this.state.search} />}></Route>
                            </Switch>
                    }
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
