/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import firebase, {auth, provider, firestore } from '../services/firebase';
import { Link as GatsbyLink } from 'gatsby';

import jon from '../assets/images/headshots/jon.jpg';

class Brofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gradyear: '',
      major: '',
      bio: '',
      userId: ''
    }
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('brothers').doc('8gp4dr9eO7gfTj8S8YPkRLQFlq12');
    ref.get().then((doc) => {
      if (doc.exists) {
        const brother = doc.data();
        this.setState({
          name: brother.name,
          gradyear: brother.gradyear,
          major: brother.major, 
          bio: brother.bio,
          userid: brother.userid
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  render() {
    const siteTitle = 'Theta Tau | SJSU';
    var db = firebase.firestore();
    const id = this.props.location.state.id;
    db.collection("brothers").doc(id)
        .get()
        .then(function(doc) {
            if (doc.exists) {
            console.log("Document data:", doc.data());
            setData(doc.data())
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    // Edit Portion
    return (
      <section>
        <Helmet title={siteTitle} />
        <NavBar />
        <section id="brofile">
          <div className="grid-wrapper">
            <div className="col-3">
              <span className="image brofile">
                <img className="pillars-pic" src={jon} alt=""/>
              </span>
              <div className="brofile-info">
                <h3 className="brofile-info--class">Class</h3>
                <p>Alpha</p>    
                <h3>Major</h3>
                <p>{this.state.major}</p>
                <h3>Position</h3>
                <p>Vice Regent</p>
              </div>
            </div>
            <div className="col-6">
                <h1>{this.state.name}</h1>
                <p>{this.state.bio}</p>
            </div>
            <div className="col-3">
                <div className="brofile-links">
                <a href="https://www.linkedin.com/in/jonathanchiwong/" className="button brofile">LinkedIn</a>
                <a href="https://github.com/joncwong" className="button brofile">Github</a>
                <GatsbyLink to="/edit" className="button brofile small edit">Edit</GatsbyLink>
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
