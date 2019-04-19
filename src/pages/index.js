import React from "react";
import Helmet from "react-helmet";
import Layout from '../components/layout';
import "../assets/scss/main.scss";
import 'bootstrap';

import pic02 from '../assets/images/pic02.jpg'
import pic04 from '../assets/images/pic04.jpg'

import intelTour from '../assets/images/intel.png'
import mark from '../assets/images/mark.jpg'
import pledgeEventPic from '../assets/images/pledge-event-cropped.png'

class Homepage extends React.Component {
    render() {
        const siteTitle = "Theta Tau | SJSU";

        return (
            <Layout>
                <Helmet title={siteTitle} />
                <div id="page-wrapper">
                <section className="main style1">

                    <div className="grid-wrapper">
                        <div className="col-6">
                            <header className="major">
                                <h2>About Theta Tau</h2>
                            </header>
                            <p>Theta Tau is the largest and oldest Co-ed Engineering Fraternity in the United States. The purpose of Theta Tau is to develop and maintain a high standard of professional interest among its members, and to unite them in a strong bond of fraternal fellowship.</p>
                        </div>
                        <div className="col-6">
                            <span className="image fit"><img src={pledgeEventPic} alt="" /></span>
                        </div>
                    </div>
                </section>

                <section id="two" className="main style2">
                    <div className="grid-wrapper">
                        <div id="mark" className="col-4">
                        <span className="image fit"> <img src={mark} alt=""></img></span>
                        </div>
                        <div className="col-7">
                            <header className="major">
                                <h2>A Message From Our Founding Regent</h2>
                            </header>
                            <p>"Hi, I’m Mark and I started a chapter of Theta Tau here at SJSU because I’m a firm believer in building things that matter. Theta Tau is a professional engineering fraternity that combines two of the things that I think matter most: career and community. Come check us out!"</p>
                            <p> ~ Mark Muendelein, Mechanical Engineering '19</p>
                            
                        </div>
                    </div>
                </section>

                <section id="three" className="main style1 special">
                    <div className="grid-wrapper">
                        <div className="col-12">
                            <header className="major">
                                <h2>Our 3 Pillars</h2>
                            </header>
                            <p>The purpose of Theta Tau is to develop and maintain a high standard of professional interest amongst its members, and to unite them in a strong bond of fraternal fellowship.</p>
                        </div>

                        <div className="col-4">
                            <span className="image fit"><img className="pillars-pic" src={pic02} alt="" /></span>
                            <h3>Brotherhood</h3>
                            <p>We forge lifelong bonds of fraternal friendship, a journey that develops and delivers a network of lasting personal and professional relationships. We foster an inviting, safe, and social environment in which our members become lifelong friends.</p>
                            <ul className="actions">
                                <li><a href="/" className="button">More</a></li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <span className="image fit"><img className="pillars-pic" src={intelTour} alt="" /></span>
                            <h3>Professionalism</h3>
                            <p>We develop and nurture engineers with strong communication, problem-solving, collaboration, and leadership skills that we demonstrate in our profession, our community, and in our lives.</p>
                            <ul className="actions">
                                <li><a href="/" className="button">More</a></li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <span className="image fit"><img className="pillars-pic" src={pic04} alt="" /></span>
                            <h3>Community Service</h3>
                            <p>We are known for our service to our college, university and the larger community. Our service projects create a unifying environment for learning and personal growth for our members.</p>
                            <ul className="actions">
                                <li><a href="/" className="button">More</a></li>
                            </ul>
                        </div>

                    </div>
                </section>

                <section id="four" className="main style2 special">
                    <div className="container">
                        <header className="major">
                            <h2>Interested in joining?</h2>
                        </header>
                        <p><b>Check us out at Rush!</b></p>
                        <ul className="actions uniform">
                            <li><a href="/" className="button special">Subscribe</a></li>
                            <li><a href="/" className="button">Rush Fall 2019</a></li>
                        </ul>   
                    </div>
                   
                </section>
            </div>
            </Layout>
        );
    }
}

export default Homepage;