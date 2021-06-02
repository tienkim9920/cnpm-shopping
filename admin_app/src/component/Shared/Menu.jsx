import React, { useState, useContext, useEffect } from 'react';
import {
    NavLink,
    Redirect
} from "react-router-dom";
import { AuthContext } from '../context/Auth'

function Menu() {
    const { user, jwt } = useContext(AuthContext);

    const [menu, setMenu] = useState([
        {
            item: "Customer",
            permission: "Nhân Viên"
        },
        {
            item: "Coupon",
            permission: "Nhân Viên"
        },
        {
            item: "Product",
            permission: "Nhân Viên"
        },
        {
            item: "Sale",
            permission: "Nhân Viên"
        },
        {
            item: "Category",
            permission: "Nhân Viên"
        },
        {
            item: "Order",
            permission: "Nhân Viên"
        },
        {
            item: "ConfirmOrder",
            permission: "Nhân Viên"
        },
        {
            item: "Delivery",
            permission: "Nhân Viên"
        },
        {
            item: "ConfirmDelivery",
            permission: "Nhân Viên"
        },
        {
            item: "CompletedOrder",
            permission: "Nhân Viên"
        },
        {
            item: "CancelOrder",
            permission: "Nhân Viên"
        },
        {
            item: "User",
            permission: "Admin"
        },
        {
            item: "Permission",
            permission: "Admin"
        }
        // "Category", ,
        // "Permission",
        // "User",
        // "Order",
        // "ConfirmOrder",
        // "Delivery",
        // "ConfirmDelivery",   
        // "CompletedOrder",
        // "CancelOrder"
    ])
    let { pathname } = window.location;
    return (
        <div>
            {
                jwt && user ?
                    (
                        <aside className="left-sidebar" data-sidebarbg="skin6">
                            <div className="scroll-sidebar" data-sidebarbg="skin6">
                                <nav className="sidebar-nav">
                                    <ul id="sidebarnav">

                                        <li className="list-divider"></li>

                                        <li className="nav-small-cap"><span className="hide-menu">Components</span></li>


                                        <li className="sidebar-item"> <a className="sidebar-link has-arrow" href="#"
                                            aria-expanded="false"><i data-feather="grid" className="feather-icon"></i><span
                                                className="hide-menu">Tables </span></a>
                                            <ul aria-expanded="false" className="collapse  first-level base-level-line">
                                                {
                                                    menu && menu.map((item, index) => (
                                                        (
                                                            <li className="sidebar-item active" key={index}>
                                                                {
                                                                    item.permission === user.id_permission.permission ?
                                                                        (
                                                                            <NavLink to={"/" + item.item.toLowerCase()} className="sidebar-link">
                                                                                {item.item}
                                                                            </NavLink>
                                                                        ) :
                                                                        (
                                                                            <div></div>
                                                                        )
                                                                }
                                                            </li>
                                                        )
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </aside>
                    ) :
                    (
                        <Redirect to="/" />
                    )
            }
        </div>


    );
}

export default Menu;