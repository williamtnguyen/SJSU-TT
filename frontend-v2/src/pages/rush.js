import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col, Divider } from 'antd';
import rushStyles from '../styles/pages/rush.module.scss';
import rushBanner from '../images/rush-banner.jpg';
import rushSchedule from '../images/rush-F21.png';

const Rush = () => {
  return (
    <>
      <Helmet>
        <title>Theta Tau | Rush</title>
        <meta
          name="description"
          content="SJSU Theta Tau has rush every semester. Come check us out at tabling during rush season!"
        />
      </Helmet>

      <div className={rushStyles.root}>
        <div className={rushStyles.banner}>
          <img src={rushBanner} alt="brothers-banner" />
          <div className={rushStyles.banner__overlay} />
          <div className={rushStyles.banner__text}>
            <div className="container">
              <h1>Rush with Theta Tau</h1>
            </div>
          </div>
        </div>

        {/* <div className={rushStyles.schedule__container}>
          <div className="container">
            <Row className={rushStyles.schedule__row}>
              <Col md={15} className={rushStyles.schedule__col}>
                <h1 className={rushStyles.title}>Fall 2021 Rush Schedule</h1>
                <img src={rushSchedule} alt="rush-schedule" />
              </Col>
            </Row>
          </div>
          </div> */}

        <div className="container">
          <Divider />
        </div>

        <div className={rushStyles.faq__container}>
          <div className="container">
            <h1 className={rushStyles.title}>Rush FAQ</h1>
            <div className={rushStyles.faq__item}>
              <h1>Q: What is a Professional Fraternity?</h1>
              <p>
                A professional fraternity is a brotherhood consisting chiefly of
                individuals in a specific field of education, promoting
                professional development in addition to strengthening brotherly
                ties.
              </p>
            </div>
            <div className={rushStyles.faq__item}>
              <h1>Q: What are the Requirements to Rush?</h1>
              <p>
                Rush is an opportunity for you to learn more about Theta Tau by
                meeting both our active and graduated brothers. Rush consists of
                multiple events that will give you a taste of what our
                fraternity stands for, whether you are a good fit for us, and
                whether we are a good fit for you. At the end of rush, we extend
                a limited number of interviews and bids. Those who receive bids
                can then decide whether or not they would like to pledge.
                Rushing is completely free of charge and there are no
                obligations.
              </p>
            </div>
            <div className={rushStyles.faq__item}>
              <h1>Q: Who can Rush?</h1>
              <ul>
                <li>Must be an SJSU student</li>
                <li>Major must be Abet accredited</li>
                <li>Must have a minimum 2.0 GPA</li>
                <li>
                  Must have at least 2 semesters remaining at SJSU (one to
                  pledge and one to be an active brother)
                </li>
              </ul>
            </div>
            <div className={rushStyles.faq__item}>
              <h1>Q: Why join Theta Tau?</h1>
              <p>
                Whether you’re a freshman or a junior, Theta Tau offers many
                benefits socially, professionally, and academically. Theta Tau
                is a diverse group of engineers who grow close together while
                striving towards similar goals. We believe that joining an
                organization in which we can build lasting friendships, hone our
                engineering and leadership skills, and give back to our
                community will contribute to our growth as individuals both in
                our professional and personal lives. We are committed to
                fostering a welcoming, safe, and social environment, and we
                invite you to join us!
              </p>
            </div>
            <div className={rushStyles.faq__item}>
              <h1>Q: Is Rush Mandatory to Apply?</h1>
              <p>
                There are no attendance requirements in order to apply for the
                pledge program. However, it is strongly encouraged for all
                potential candidates to attend as many events as possible in
                order for them to get to know the Chapter better and vice versa.
              </p>
            </div>
            <div className={rushStyles.faq__item}>
              <h1>Q: What is Pledging?</h1>
              <p>
                Pledging is a semester long process in which you will be given
                the opportunity to show your character, skills, and leadership
                to the SJSU Chapter of Theta Tau. You and your pledge class will
                be given a set of tasks to execute, each of which embodies the 3
                pillars of Theta Tau. The goals of assigning these tasks are to
                develop critical academic and profesional skills critical to
                one's career, as well as engage pledges in long-lasting
                brotherhood.
              </p>
            </div>
            <div className={rushStyles.faq__item}>
              <h1>Q: What is a Bid?</h1>
              <p>
                A bid is a formal invitation to begin pledging, the process of
                becoming a brother.
              </p>
            </div>
            <div className={rushStyles.faq__item}>
              <h1>Q: How does Theta Tau decide who receives a Bid?</h1>
              <p>
                Theta Tau searches for engineers who have a strong foundation in
                its three pillars: Brotherhood, Professionalism, and Service. We
                review each applicant as a whole (grades, personality,
                professionalism, resume, etc.) to determine whether we are the
                right fit for you.
              </p>
            </div>
            <div className={rushStyles.faq__item}>
              <h1>Q: Does Theta Tau Haze?</h1>
              <p>Theta Tau has a strict zero‐tolerance policy for hazing.</p>
            </div>
            <div className={rushStyles.faq__item}>
              <h1>
                Q: If I don’t receive a bid, can I rush again the next semester?
              </h1>
              <p>
                Yes! Oftentimes, it is the case that we have an abundance of
                great potential members, and cannot extend bids to as many
                members as we would like. We highly encourage that those who do
                not receive bids to come back and rush again the following
                semester.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rush;
