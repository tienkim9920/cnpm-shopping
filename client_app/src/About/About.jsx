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
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia libero eum totam a non similique numquam possimus ab natus esse, praesentium quibusdam voluptatibus eius soluta cupiditate sapiente sunt dolorum omnis!</p>
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
                                            <h3 class="counter">3</h3>
                                        </div>
                                        <div class="counter-text">
                                            <span>Khách Hàng</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="limupa-counter gray-bg">
                                <div class="counter-info">
                                    <div class="counter-number">
                                        <h3 class="counter">0</h3>
                                    </div>
                                    <div class="counter-text">
                                        <span>Giải Thưởng</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="limupa-counter white-smoke-bg">
                                <div class="counter-info">
                                    <div class="counter-number">
                                        <h3 class="counter">30</h3>
                                    </div>
                                    <div class="counter-text">
                                        <span>Giờ Làm Việc</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="limupa-counter gray-bg">
                                <div class="counter-info">
                                    <div class="counter-number">
                                        <h3 class="counter">1</h3>
                                    </div>
                                    <div class="counter-text">
                                        <span>Hoàn Thành Dự Án</span>
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
                        <div class="row d-flex justify-content-center">
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
                                        <h3>Minh Hiếu</h3>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;