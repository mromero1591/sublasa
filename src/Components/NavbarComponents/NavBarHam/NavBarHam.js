import React from 'react';

function NavBarHam(props) {

    // const [isActive, setIsActive] = useState(false);

    return (
        <button onClick={() => {props.toggleMenu()}} className={`button is-white navbar-burger burger ${props.isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </button>
    )
}

export default NavBarHam;