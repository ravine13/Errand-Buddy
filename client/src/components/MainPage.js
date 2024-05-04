import React from "react";
import banner from "../assets/banner.jpg";
import "./mainpage.css";
import { Link} from 'react-router-dom'
const MainPage = () => {
  return (
    <>
      <div className="main-page" id="Home">
        <nav className="main-nav">
          <div className="nav-logo">
            <a href="#">Errand Buddy.io</a>
          </div>
          <ul className="nav-list">
            <li className="link">Home</li>
            <li className="link">About</li>
            <li className="link">Contact Us</li>
            <Link className="link" to={"/Login"}>LOGIN</Link>
          </ul>
        </nav>
        <div className="main-container">
          <div className="left-col">
            <div className="content">
              <h1 className="main-title">WELCOME TO Errand Buddy</h1>
              <p className="main-paragraph">
              Struggling with personal tasks in this fast-paced world? Meet Errand Buddy, your personal task manager. We connect you with dependable errand runners, our “Errand Boys”, in your vicinity.
              Need groceries, a package delivered, or any task done? Just log in, describe your task, and we’ll find the nearest Errand Boy. You’ll be notified once the task is done, and you can pay through the app.But there’s more! If you’re efficient, reliable, and seeking flexible work, you can earn extra income by signing up as an Errand Boy. Welcome to Errand Buddy, where we make life easier for you
              </p>
            </div>
            <div className="main-buttons">
              <button className="about">
                <a href="#Features">Features</a>
              </button>
              <button className="contact-us">
                <a href="#Contacts">Contact Us</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-about" id="Features">
        <div className="about-wrapper">
          <div className="services">
            <h1 className="our-services">
              Our Services<span className="serv"></span>
            </h1>
            <div className="service-cards">
              <div className="service-card">
                <i className="ri-shake-hands-fill"></i>
                <h2>Onboarding</h2>
                <p>
                  Seamlessly integrate new errand boys with our intuitive
                  onboarding feature, streamlining the process from offer
                  acceptance to orientation, ensuring a smooth transition into
                  your organization's culture and workflow
                </p>
              </div>
              <div className="service-card">
                <i className="ri-bank-card-2-line"></i>
                <h2>Automated Pay</h2>
                <p>
                As an Errand Boy, our streamlined system ensures that you receive accurate and detailed compensation statements through our Automated Payslip feature. No more manual calculations or paperwork—just seamless management of your earnings.
                </p>
              </div>
              <div className="service-card">
                <i className="ri-line-chart-fill"></i>
                <h2>Goal Tracker</h2>
                <p>
                Promote professional growth and development within our Errand Buddy community. Our comprehensive goals and sessions feature allows Errand Boys and job providers to collaboratively set, track, and evaluate performance objectives. This fosters a culture of continuous improvement and achievement, making every errand an opportunity for growth.
                </p>
              </div>
              <div className="service-card">
                <i className="ri-profile-line"></i>
                <h2>Employee Profiles</h2>
                <p>
                Boost engagement and satisfaction with personalized accounts in our Errand Buddy app. Errand Boys can customize their profiles, access relevant job information, and manage preferences, enhancing their overall experience within our digital ecosystem. Let’s make every errand a breeze!.
                </p>
              </div>
              <div className="service-card">
                <i className="ri-user-add-fill"></i>
                <h2>Hiring</h2>
                <p>
                At Errand Buddy, we offer a simple sign-up process and thorough background checks. Our platform allows you to explore job openings that match your skills. Apply easily, and our team will promptly evaluate your application. Once selected, you’ll transition smoothly into your role. Join us and make life easier together!.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-contact-us" id="Contacts">
        <div className="footer-container">
          <div className="row">
            <div className="footer-col">
              <h4>Errand boy</h4>
              <ul>
                <li className="links">
                  <a href="#Home">Home</a>
                </li>
                <li className="links">
                  <a href="#Features">Features</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contacts</h4>
              <ul>
                <li>
                  <i className="ri-customer-service-fill"></i>
                  000-132-877-090
                </li>
                <li>
                  <i className="ri-customer-service-fill"></i>
                  009-888-122-999
                </li>
                <li>
                  <i className="ri-customer-service-fill"></i>
                  993-455-877-122
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Newsletter</h4>
              <form action="" className="newsletter">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="inputName"
                />
                <input
                  type="email"
                  placeholder="Enter Company Email"
                  className="inputEmail"
                />
                <button className="inputButton" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <hr className="line" />
          <p className="copyright">2024 HRS. All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default MainPage;
