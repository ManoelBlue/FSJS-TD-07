import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Photo from './Photo';

class PhotoContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {isSearch, query} = this.props;
        let photos = this.props.data.map(photo => <Photo key={photo.id} data={photo} />);
        console.log(this.props)

        return (
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    {
                        (photos.length > 0)
                            ? photos
                            :
                                <li className="not-found">
                                    <h3>No Results Found</h3>
                                    <p>You search did not return any results. Please try again.</p>
                                </li>
                    }
                </ul>
                {
                    isSearch
                    ? <Redirect to={`/search/${query}`} />
                    : null
                }
            </div>
        )
    }
}

export default PhotoContainer;