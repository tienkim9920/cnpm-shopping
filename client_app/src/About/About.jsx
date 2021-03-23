import React from 'react';
import PropTypes from 'prop-types';
import Global from '../Image/Global'

About.propTypes = {

};

function About(props) {
    return (
        <div>
            <div class="breadcrumb-area">
                <div class="container">
                    <div class="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li class="active">About Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="about-us-wrapper pt-60 pb-40">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 order-last order-lg-first">
                            <div class="about-text-wrap">
                                <h2><span>Provide Best</span>Product For You</h2>
                                <p>We provide the best Beard oile all over the world. We are the worldd best store in indi for Beard Oil. You can buy our product without any hegitation because they truste us and buy our product without any hagitation because they belive and always happy buy our product.</p>
                                <p>Some of our customer say’s that they trust us and buy our product without any hagitation because they belive us and always happy to buy our product.</p>
                                <p>We provide the beshat they trusted us and buy our product without any hagitation because they belive us and always happy to buy.</p>
                            </div>
                        </div>
                        <div class="col-lg-5 col-md-10">
                            <div class="about-image-wrap">
                                <img class="img-full" src={Global.Avatar} alt="About Us" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="counterup-area">
                <div class="container-fluid p-0">
                    <div class="row no-gutters">
                        <div class="col-lg-3 col-md-6">
                            <div class="limupa-counter white-smoke-bg">
                                <div class="container">
                                    <div class="counter-info">
                                        <div class="counter-number">
                                            <h3 class="counter">2169</h3>
                                        </div>
                                        <div class="counter-text">
                                            <span>HAPPY CUSTOMERS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="limupa-counter gray-bg">
                                <div class="counter-info">
                                    <div class="counter-number">
                                        <h3 class="counter">869</h3>
                                    </div>
                                    <div class="counter-text">
                                        <span>AWARDS WINNED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="limupa-counter white-smoke-bg">
                                <div class="counter-info">
                                    <div class="counter-number">
                                        <h3 class="counter">689</h3>
                                    </div>
                                    <div class="counter-text">
                                        <span>HOURS WORKED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="limupa-counter gray-bg">
                                <div class="counter-info">
                                    <div class="counter-number">
                                        <h3 class="counter">2169</h3>
                                    </div>
                                    <div class="counter-text">
                                        <span>COMPLETE PROJECTS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="team-area pt-60 pt-sm-44">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="li-section-title capitalize mb-25">
                                    <h2><span>our team</span></h2>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-6 col-sm-6">
                                <div class="team-member mb-60 mb-sm-30 mb-xs-30">
                                    <div class="team-thumb">
                                        <img src={Global.Avatar} alt="Our Team Member" />
                                    </div>
                                    <div class="team-content text-center">
                                        <h3>Tiền Kim</h3>
                                        <p>Web Developer ( Full-Stack )</p>
                                        <a href="#">info@example.com</a>
                                        <div class="team-social">
                                            <a href="#"><i class="fa fa-facebook"></i></a>
                                            <a href="#"><i class="fa fa-twitter"></i></a>
                                            <a href="#"><i class="fa fa-linkedin"></i></a>
                                            <a href="#"><i class="fa fa-google-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6">
                                <div class="team-member mb-60 mb-sm-30 mb-xs-30">
                                    <div class="team-thumb">
                                        <img src={Global.Avatar} alt="Our Team Member" />
                                    </div>
                                    <div class="team-content text-center">
                                        <h3>Gia Khang</h3>
                                        <p>Back-End ( API )</p>
                                        <a href="#">info@example.com</a>
                                        <div class="team-social">
                                            <a href="#"><i class="fa fa-facebook"></i></a>
                                            <a href="#"><i class="fa fa-twitter"></i></a>
                                            <a href="#"><i class="fa fa-linkedin"></i></a>
                                            <a href="#"><i class="fa fa-google-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6">
                                <div class="team-member mb-30 mb-sm-60">
                                    <div class="team-thumb">
                                        <img src={Global.Avatar} alt="Our Team Member" />
                                    </div>
                                    <div class="team-content text-center">
                                        <h3>Quốc Toàn</h3>
                                        <p>Web Designer</p>
                                        <a href="#">info@example.com</a>
                                        <div class="team-social">
                                            <a href="#"><i class="fa fa-facebook"></i></a>
                                            <a href="#"><i class="fa fa-twitter"></i></a>
                                            <a href="#"><i class="fa fa-linkedin"></i></a>
                                            <a href="#"><i class="fa fa-google-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6">
                                <div class="team-member mb-30 mb-sm-60 mb-xs-60">
                                    <div class="team-thumb">
                                        <img src={Global.Avatar} alt="Our Team Member" />
                                    </div>
                                    <div class="team-content text-center">
                                        <h3>Thái Hùng</h3>
                                        <p>Web Designer</p>
                                        <a href="#">info@example.com</a>
                                        <div class="team-social">
                                            <a href="#"><i class="fa fa-facebook"></i></a>
                                            <a href="#"><i class="fa fa-twitter"></i></a>
                                            <a href="#"><i class="fa fa-linkedin"></i></a>
                                            <a href="#"><i class="fa fa-google-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;