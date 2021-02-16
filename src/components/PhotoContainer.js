import React, {Component} from 'react';

import Photo from './Photo';

class PhotoContainer extends Component {

    componentDidUpdate() {
        console.log('Update Photo Container');
        if(/^\/search/i.test(this.props.location.pathname)) {
            this.props.onSearch(this.props.location.pathname.slice(8), 'search')
        }
    }

    render() {
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
            </div>
        )
    }
}

export default PhotoContainer;