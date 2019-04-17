import React from 'react'

class NavBar extends React.Component {
    render() {
        return (
            <section id="fixed-nav-bar">
                <nav>
                    <a href="#">Theta Tau | SJSU</a>
                    <a href="#home">Home</a>
                    <a href="#home">About</a>
                    <a href="brothers">Brothers</a>
                    <a href="rush">Rush</a>
                </nav>
            </section>
        )
    }
}

export default NavBar
