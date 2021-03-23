import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

SignUp.propTypes = {
    
};

function SignUp(props) {
    return (
        <div>
            <div class="breadcrumb-area">
                <div class="container">
                    <div class="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li class="active">Register</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="page-section mb-60">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xs-12 mr_signin">
                            <form action="#">
                                <div class="login-form">
                                    <h4 class="login-title">Register</h4>
                                    <div class="row">
                                        <div class="col-md-12 mb-20">
                                            <label>Full Name *</label>
                                            <input class="mb-0" type="text" placeholder="First Name" />
                                        </div>
                                        <div class="col-md-12 mb-20">
                                            <label>Email Address*</label>
                                            <input class="mb-0" type="email" placeholder="Email Address" />
                                        </div>
                                        <div class="col-md-6 mb-20">
                                            <label>Password *</label>
                                            <input class="mb-0" type="password" placeholder="Password" />
                                        </div>
                                        <div class="col-md-6 mb-20">
                                            <label>Confirm Password *</label>
                                            <input class="mb-0" type="password" placeholder="Confirm Password" />
                                        </div>
                                        <div class="col-md-12 mb-20">
                                            <div class="d-flex justify-content-end">
                                                <Link to="/signin">Do You Want To Login?</Link>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button class="register-button mt-0" style={{ cursor: 'pointer'}}>Register</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;