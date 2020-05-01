import React from 'react';
import Helmet from 'react-helmet';
import { Link as GatsbyLink } from 'gatsby';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import firebase, { auth, provider, firestore } from '../services/firebase';
import {
  linkLoginRequest, checkLinkLogin, isLoggedIn, getUser
} from '../services/auth.js';

import derek from '../assets/images/headshots/derekhuang.jpg';


class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name: '',
      class: '',
      position: '',
      major: '',
      bio: '',
      linkedin: '',
      userid: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.location.state;
    const ref = firebase.firestore().collection('brothers').doc(id); /* <-------  THIS IS WHERE UNIQUE USER ID WOULD GO */
    ref.get().then((doc) => {
      if (doc.exists) {
        const brother = doc.data();
        this.setState({
          name: brother.name,
          class: brother.class,
          major: brother.major,
          position: brother.position,
          bio: brother.bio,
          linkedin: brother.linkedin,
          userid: brother.userid
        });
      } else {
        console.log('No such document!');
      }
    });
  }

    /* Include these for form submssion */
    handleInputChange = (event) => {
      const { target } = event;
      const { value } = target;
      const { name } = target;
      this.setState({
        [name]: value // idk what this does
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const db = firebase.firestore();
      db.collection('brothers').doc(this.state.userid).update({
        name: this.state.name,
        class: this.state.class,
        position: this.state.position,
        bio: this.state.bio,
        linkedin: this.state.linkedin
      });
      // window.location.reload();
    }


    render() {
      if (isLoggedIn()) {
        loggedInUser = getUser();
        if (loggedInUser) {
          console.log('LOGGED IN');
          this.setState({
            user: result.user
          });
        }
      }

      const db = firebase.firestore();
      const { id } = this.props.location.state;
      db.collection('brothers').doc(this.state.userid) /* <-------  THIS IS WHERE UNIQUE USER ID WOULD GO */
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            setData(doc.data());
          } else {
            // doc.data() will be undefined in this case
            // console.log("No such document!");
          }
        })
        .catch((error) => {
          // console.log("Error getting document:", error);
        }); decodeURIComponent;

      const siteTitle = 'Theta Tau | SJSU';
      return (
        <section>
          <Helmet title={siteTitle} />
          <NavBar />
          <section id="edit">
            <form name="loginForm" onSubmit={this.handleSubmit}>

              <div className="grid-wrapper">
                <div className="col-4">
                  <img
                    src={derek}
                    name="profilepic"
                  />
                  <h4>Class:</h4>
                  <input
                    type="text"
                    name="class"
                    required
                    defaultValue={this.state.class}
                    onChange={this.handleInputChange}
                  />
                  <h4>Major:</h4>
                  <input
                    type="text"
                    name="major"
                    required
                    defaultValue={this.state.major}
                    onChange={this.handleInputChange}
                  />
                  <h4>Position:</h4>
                  <input
                    type="text"
                    name="position"
                    required
                    defaultValue={this.state.position}
                    onChange={this.handleInputChange}
                  />
                  <h4>LinkedIn:</h4>
                  <input
                    type="text"
                    name="linkedin"
                    required
                    defaultValue={this.state.linkedin}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-8">
                  <div className="bio">
                    <h4>Bio:</h4>

                    <textarea
                      id="bio"
                      name="bio"
                      rows="13"
                      cols="100"
                      defaultValue={this.state.bio}
                      onChange={this.handleInputChange}
                    />
                    <br />

                    <label>
                      <button type="submit">
                        <GatsbyLink to="/brofile" />
                        Submit
                      </button>
                    </label>
                  </div>
                  <br />

                </div>

              </div>

            </form>
          </section>
          <Footer />
        </section>
      );
    }
} export default edit;
