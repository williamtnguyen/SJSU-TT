import React from 'react'
import { Link } from "gatsby"

class NavBar extends React.Component {
    render() {
        return (
            <section id="fixed-nav-bar">
                <nav id="inner-nav">
                    <div class="nav-left">
                        <Link to="/">Theta Tau | SJSU</Link>
                    </div>
                    <div class="nav-right">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/brothers">Brothers</Link>
                        <Link to="/rush">Rush</Link>
                    </div>
                </nav>
            </section>
        )
    }
}

export default NavBar
