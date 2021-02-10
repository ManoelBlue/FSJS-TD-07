import {NavLink} from 'react-router-dom';

// Nav stateless component:
const Nav = (props) => {
    return (
        <nav class="main-nav">
            <ul>
                <li><NavLink to='/cats'>Cats</NavLink></li>
                <li><NavLink to='/dogs'>Dogs</NavLink></li>
                <li><NavLink to='/computers'>Computers</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav;