import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Profile.css'
import avt from './avt.jpg'

Profile.propTypes = {

};

function Profile(props) {

    
    const [name, set_name] = useState('')
    const [username, set_username] = useState('')
    const [website, set_website] = useState('')
    const [email, set_email] = useState('')
    const [phone, set_phone] = useState('')
    const [password, set_password] = useState('')
    const [new_password, set_new_password] = useState('')
    const [compare_password, set_compare_password] = useState('')

    // Hàm này dùng để render html cho từng loại edit profile hoặc change password
    // Tùy theo người dùng chọn
    const [edit_status, set_edit_status] = useState('edit_profile')

    const handler_Status = (value) => {

        set_edit_status(value)

    }


    return (
        <div className="container mt-5 pt-4" style={{ paddingBottom: '4rem'}}>
            <div className="group_profile">
                <div className="group_setting mt-3">
                    <div className="setting_left">
                        <div className={edit_status === 'edit_profile' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('edit_profile')}>

                            <a className={edit_status === 'edit_profile' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Edit Profile</a>

                        </div>

                        <div className={edit_status === 'change_password' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('change_password')}>

                            <a className={edit_status === 'change_password' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Change Password</a>

                        </div>
                    </div>
                    <div className="setting_right">
                        {
                            edit_status === 'edit_profile' ? (
                                <div className="setting_edit_profile">
                                    <div className="header_setting_edit d-flex justify-content-center pt-4 pb-4">
                                        <div className="d-flex">
                                            <img src={avt} alt="" className="image_header_setting_edit" />
                                            <div className="ml-4">
                                                <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Nguyen Kim Tien</span>
                                                <br />
                                                <a href="#" data-toggle="modal" data-target="#exampleModal">
                                                    Change Profile Photo</a>

                                                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Change Profile Photo</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Name</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={name}
                                                onChange={(e) => set_name(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Username</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={username}
                                                onChange={(e) => set_username(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Website</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={website}
                                                onChange={(e) => set_website(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Email</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" disabled={true} value={email}
                                                onChange={(e) => set_email(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Phone Number</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={phone}
                                                onChange={(e) => set_phone(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center pt-3 pb-4">
                                        <button className="btn btn-secondary">Submit</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="setting_change_password">
                                    <div className="header_setting_edit d-flex justify-content-center pt-4 pb-4">
                                        <div className="d-flex">
                                            <img src={avt} alt="" className="image_header_setting_edit" />
                                            <div className="ml-4 mt-2">
                                                <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>nkt.9920</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Old Password</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="password" value={password}
                                                onChange={(e) => set_password(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }} >New Password</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="password" value={new_password}
                                                onChange={(e) => set_new_password(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Confirm New Password</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="password" value={compare_password}
                                                onChange={(e) => set_compare_password(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center pt-3 pb-4 align-items-center">
                                        <button className="btn btn-secondary">Change Password</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;