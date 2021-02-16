import React, {Component} from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';

import './App.css';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            cats: [],
            dogs: [],
            computers: [],
            search: [],
            query: '',
            loading: true
        }
    }

    //  Add data to eh state as component mounts:
    componentDidMount() {
        this.fetchData('animals', 'photos');
        this.fetchData('cats', 'cats');
        this.fetchData('dogs', 'dogs');
        this.fetchData('computers', 'computers');

        console.log('Mount App')

        if(/^\/search/i.test(this.props.location.pathname)) {
            console.log(this.props.location.pathname.slice(8));
            this.fetchData(this.props.location.pathname.slice(8), 'search')
        }
    }

    // Method to fetch data from flickr api:
    fetchData = (search, stateName) => {
        let searchText = search.replace(/\s/gi, '+');
        let searchTag = search.replace(/\s/gi, '%2C');
        let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTag}&tag_mode=all&text=${searchText}&safe_search=3&content_type=1&per_page=24&format=json&nojsoncallback=1`;

        axios.get(url)
            .then(response => {
                this.setState({
                    [`${stateName}`]: response.data.photos.photo,
                    query: search,
                    loading: false
                })
            })
            .catch(error => console.error('Error fetching data', error));
    }

    render() {
        const { match, location, history } = this.props;
        let {photos, cats, dogs, computers, search, query} = this.state;

        return (
            <div className="container">
                <SearchForm onSearch={this.fetchData} history={history} location={location} />
                <Nav />

                {
                    (this.state.loading)
                    ? <p>Loading...</p>
                    :
                        <Switch>
                            <Route exact path="/" render={() => <PhotoContainer location={location} data={photos} />}></Route>
                            <Route path="/cats" render={() => <PhotoContainer location={location} data={cats} />}></Route>
                            <Route path="/dogs" render={() => <PhotoContainer location={location} data={dogs} />}></Route>
                            <Route path="/computers" render={() => <PhotoContainer location={location} data={computers} />}></Route>
                            <Route path="/search/:query" render={() => <PhotoContainer location={location} data={search} onSearch={this.fetchData} />}></Route>
                            <Route component={NotFound} />
                        </Switch>
                }
            </div>
        );
    }
}

export default withRouter(App);
