/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import { Link as GatsbyLink } from 'gatsby';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import firebase, { auth, provider, firestore } from '../services/firebase';

import derek from '../assets/images/headshots/derekhuang.jpg';

class Brofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gradyear: '',
      major: '',
      bio: '',
      userId: '',
      linkedin: '',
      position: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.location.state;
    const ref = firebase.firestore().collection('brothers').doc(id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const brother = doc.data();
        this.setState({
          name: brother.name,
          gradyear: brother.gradyear,
          major: brother.major,
          bio: brother.bio,
          userid: brother.userid,
          linkedin: brother.linkedin,
          position: brother.position
        });
      } else {
        console.log('No such document!');
      }
    });
  }

  render() {
    const siteTitle = 'Theta Tau | SJSU';
    const db = firebase.firestore();
    const { id } = this.props.location.state;
    db.collection('brothers').doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          setData(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
    return (
      <section>
        <Helmet title={siteTitle} />
        <NavBar />
        <section id="brofile">
          <div className="grid-wrapper">
            <div className="col-3">
              <span className="image brofile">
                <img className="pillars-pic" src={derek} alt="" />
              </span>
              <div className="brofile-info">
                <h3 className="brofile-info--class">Class</h3>
                <p>Alpha</p>
                <h3>Major</h3>
                <p>{this.state.major}</p>
                <h3>Position</h3>
                <p>{this.state.position}</p>
              </div>
            </div>
            <div className="col-6">
              <h1>{this.state.name}</h1>
              <p>{this.state.bio}</p>
            </div>
            <div className="col-3">
              <div className="brofile-links">
                <a href={this.state.linkedin} className="button brofile">LinkedIn</a>
                <GatsbyLink to="/edit" state={{ id }} className="button brofile small edit">Edit</GatsbyLink>
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
