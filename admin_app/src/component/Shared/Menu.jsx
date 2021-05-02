import React, { useState } from 'react';
import {
    Link,
    NavLink
} from "react-router-dom";

function Menu(props) {
    const [menu, setMenu] = useState([
        "Product",
        "Category", ,
        "Permission",
        "User",
        "Order",
        "ConfirmOrder",
        "Delivery",
        "ConfirmDelivery",
        "CompletedOrder",
        "CancelOrder"
    ])
    let { pathname } = window.location;
    return (
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
                                                <NavLink to={"/" + item.toLowerCase()} className="sidebar-link">
                                                    {item}
                                                </NavLink>
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


    );
}

export default Menu;