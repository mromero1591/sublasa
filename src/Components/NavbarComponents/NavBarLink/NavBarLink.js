import React from 'react';
import {Link} from 'react-router-dom';

function NavBarLink(props) {
    return (
        <Link to={props.path} className="navbar-item navbar-sublasa-item">{props.name}</Link>
    )
}

export default NavBarLink;