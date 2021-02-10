// Photo stateless component:

const Photo = ({data}) => {
    return (
        <li>
            <h3>{data}</h3>
            <img src="https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg" alt="" />
        </li>
    )
}

export default Photo;