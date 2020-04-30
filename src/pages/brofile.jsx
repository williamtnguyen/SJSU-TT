/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavBar from '../components/NavBar';
import logo from '../assets/images/thetatau.png';
import Footer from '../components/Footer';
import firebase, {auth, provider, firestore } from '../services/firebase';

import jon from '../assets/images/headshots/jon.jpg';

class Brofile extends React.Component {

  render() {
    const siteTitle = 'Theta Tau | SJSU';

    var db = firebase.firestore();
    db.collection("brothers").onSnapshot(function(querySnapshot) {
      var brothers = [];
  
      querySnapshot.forEach(function(doc) {
        brothers.push(doc.data().name);
  
        //List of fields which we pull from brothers database (name, year, major, bio etc)
        var name = doc.data().name;
        var major = doc.data().major;
        var bio = doc.data().bio;
      });
    });

    return (
      <section>
        <Helmet title={siteTitle} />
        <NavBar />
        <section id="brofile">
          <div className="grid-wrapper">
            <div className="col-3">
              <span class="image brofile">
                <img className="pillars-pic" src={jon} alt=""/>
              </span>
              <div className="brofile-info">
                <h3>Class</h3>
                <p>Alpha</p>    
                <h3>Major</h3>
                <p>Computer Science</p>
                <h3>Position</h3>
                <p>Vice Regent</p>
              </div>
            </div>
            <div className="col-6">
                <h1>Jonathan Wong</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi debitis nesciunt doloribus laudantium aut itaque quibusdam consectetur inventore aliquam dolorem rem quod id, voluptate recusandae voluptatibus nobis molestiae quisquam? Iure!</p>
            </div>
            <div className="col-3">
                <div class="brofile-links">
                <a href="https://www.linkedin.com/in/jonathanchiwong/" class="button brofile">LinkedIn</a>
                <a href="https://github.com/joncwong" class="button brofile">Github</a>
                <a href="" class="button brofile">Resume</a>
                </div>
            </div>
          </div>
        </section>
        <Footer />
      </section>
    );
  }
}

export default Brofile;
