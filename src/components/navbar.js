import React from 'react'

class NavBar extends React.Component {
    render() {
        return (
            <section id="fixed-nav-bar">
                <nav id="inner-nav">
                    <div class="nav-left">
                        <a href="/">Theta Tau | SJSU</a>
                    </div>
                    <div class="nav-right">
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/brothers">Brothers</a>
                        <a href="/rush">Rush</a>
                    </div>
                </nav>
            </section>
        )
    }
}

export default NavBar
