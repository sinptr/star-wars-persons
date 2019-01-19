import React from 'react';
import logo from '../../images/star-wars.png'

const Header = () => {
    return (
        <header>
            <div className="header">
                <img src={logo} alt="Star Wars logo"/>
                    <h1>Персонажи</h1>
            </div>
        </header>
    );
};

export default Header;