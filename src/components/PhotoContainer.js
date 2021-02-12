import Photo from './Photo';

//  PhotoContainer stateless component:
const PhotoContainer = props => {
    let photos = props.data.map(photo => <Photo key={photo.id} data={photo} />);

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

export default PhotoContainer;