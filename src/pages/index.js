import React from "react";
import Helmet from "react-helmet";

import Layout from '../components/layout';

import pic01 from '../assets/images/pic01.jpg'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic04 from '../assets/images/pic04.jpg'

import mark from '../assets/images/mark.jpg'
import brotherhoodPic from '../assets/images/brotherhood.png'
import pledgeEventPic from '../assets/images/pledge-event-cropped.png'

class Homepage extends React.Component {
    render() {
        const siteTitle = "Theta Tau | SJSU";

        return (
            <Layout>
                <Helmet title={siteTitle} />
                <div id="page-wrapper">
                <section id="one" className="main style1">

                {/* Custom nav bar made by jon */}
                <nav id="fixed-nav-bar">
                    <a href="#">Theta Tau | SJSU</a>
                    <a href="#home">Home</a>
                    <a href="#home">About</a>
                    <a href="brothers">Brothers</a>
                    <a href="#one">Rush</a>
                </nav>

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
                                <h2>A Message From Our Founder</h2>
                            </header>
                            <p>"Theta Tau is so great. So so great. I love Theta Tau. It's my baby."</p>
                            <p>Blandit faucibus proin. Ac aliquam integer adipiscing enim non praesent vis commodo nunc phasellus cubilia ac risus accumsan. Accumsan blandit. Lobortis phasellus non lobortis dit varius mi varius accumsan lobortis. Blandit ante aliquam lacinia lorem lobortis semper morbi col faucibus vitae integer placerat accumsan orci eu mi odio tempus adipiscing adipiscing adipiscing curae consequat feugiat etiam dolore.</p>
                            <p>Adipiscing a commodo ante nunc accumsan interdum mi ante adipiscing. A nunc lobortis non nisl amet vis volutpat aclacus nascetur ac non. Lorem curae eu ante amet sapien in tempus ac. Adipiscing id accumsan adipiscing ipsum.</p>
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
                            <span className="image fit"><img src={pic02} alt="" /></span>
                            <h3>Brotherhood</h3>
                            <p>We forge lifelong bonds of fraternal friendship, a journey that develops and delivers a network of lasting personal and professional relationships. We foster an inviting, safe, and social environment in which our members become lifelong friends.</p>
                            <ul className="actions">
                                <li><a href="#" className="button">More</a></li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <span className="image fit"><img src={pic03} alt="" /></span>
                            <h3>Professionalism</h3>
                            <p>We develop and nurture engineers with strong communication, problem-solving, collaboration, and leadership skills that we demonstrate in our profession, our community, and in our lives.</p>
                            <ul className="actions">
                                <li><a href="#" className="button">More</a></li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <span className="image fit"><img src={pic04} alt="" /></span>
                            <h3>Community Service</h3>
                            <p>We are known for our service to our college, university and the larger community. Our service projects create a unifying environment for learning and personal growth for our members.</p>
                            <ul className="actions">
                                <li><a href="#" className="button">More</a></li>
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
                            <li><a href="#" className="button special">Subscribe</a></li>
                            <li><a href="#" className="button">Rush Fall 2019</a></li>
                        </ul>   
                    </div>
                   
                </section>
            </div>
            </Layout>
        );
    }
}

export default Homepage;