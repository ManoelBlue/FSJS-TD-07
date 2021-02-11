// Photo stateless component:

const Photo = props => {
    console.log(props);
    let photo = props.data;
    const {id, server, secret, title} = photo;

    return (
        <li>
            <img src={`https://farm5.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title} />
        </li>
    )
}

export default Photo;