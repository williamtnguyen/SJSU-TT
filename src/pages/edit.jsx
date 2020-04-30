import React from 'react';
import Helmet from 'react-helmet';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import firebase, {auth, provider, firestore } from '../services/firebase';

class edit extends React.Component {
    constructor(props){
        super(props);
        
    }
    render() {
        const siteTitle = 'Theta Tau | SJSU';
        return (
            <section>
                <Helmet title={siteTitle} />
                <NavBar />
                <section id="edit">
                    <div className="grid-wrapper">
                        <div className="col-4">
                            <h2>Class:</h2>
                            <input type="text" name="class"/>
                            <h2>Major:</h2>
                            <input type="text" name="major"/>
                            <h2>Position:</h2>
                            <input type="text" name="position"/>
                        </div>
                        <div className="col-8">
                            <div className="bio">
                                <h2>Bio:</h2>
                                <textarea id ="bio" rows="13" cols="100"/>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </section>
        )
    }
} export default edit;