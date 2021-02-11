import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = props => {
    console.log(props);
    let photos = props.data.map(photo => <Photo key={photo.id} data={photo} />);

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {
                    (photos)
                    ? (photos.length > 0)
                        ? photos
                        : <h3>Loading...</h3>
                    : <NotFound />
                }
            </ul>
        </div>
    )
}

export default PhotoContainer;