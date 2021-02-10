import React, {Component} from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

class PhotoContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="photo-container">
                <h2>Results</h2>
                <h3>{this.props.data}</h3>
                <ul>
                    {
                    (this.props.data !== 'empty')
                    ? <Photo data={this.props.data}></Photo>
                    : <NotFound></NotFound>
                    }
                </ul>
            </div>
        )
    }
}

export default PhotoContainer;