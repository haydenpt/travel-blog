import React from 'react'

import './MainHeader.css'

const MainHeader = props => {
    return (
        <header className="main-header">
            {props.children}
            {/* props children is placeholder for the html components between the opening and closing tag (see MainNavigation.js)*/}
        </header>
    )
}

export default MainHeader
