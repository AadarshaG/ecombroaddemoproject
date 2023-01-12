import React from 'react';
import { FaCartPlus, FaCog, FaHome, FaProductHunt, FaSlideshare } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export function Aside(){
    return(
        <>
            <div className="left-side-bar">
                <div className="brand-logo">
                    <NavLink to="/admin">
                        <img src="" alt="" className="dark-logo" />
                       
                    </NavLink>
                    <div className="close-sidebar" data-toggle="left-sidebar-close">
                        <i className="ion-close-round"></i>
                    </div>
                </div>
                <div className="menu-block customscroll">
                    <div className="sidebar-menu">
                        <ul id="accordion-menu">
                            <li className="dropdown">
                                <NavLink to="/admin" className="dropdown-toggle">
                                    <span className="micon dw dw-house-1"></span><span className="mtext">Dashboard</span>
                                </NavLink>
                            </li>  
                            <li className="dropdown">
                                <NavLink to="/admin/about" className="dropdown-toggle">
                                    <span className="micon dw dw-house-1"></span><span className="mtext">
                                        <FaHome></FaHome> About Us</span>
                                </NavLink>
                            </li> 
                            <li className="dropdown">
                                <NavLink to="/admin/slider" className="dropdown-toggle">
                                    <span className="micon dw dw-house-1"></span><span className="mtext">
                                        <FaSlideshare></FaSlideshare> Sliders</span>
                                </NavLink>
                            </li> 
                            <li className="dropdown">
                                <NavLink to="/admin/category" className="dropdown-toggle">
                                    <span className="micon dw dw-house-1"></span><span className="mtext">
                                        <FaCog></FaCog> Category</span>
                                </NavLink>
                            </li> 
                            <li className="dropdown">
                                <NavLink to="/admin/product" className="dropdown-toggle">
                                    <span className="micon dw dw-house-1"></span><span className="mtext">
                                        <FaProductHunt></FaProductHunt> 
                                        Products</span>
                                </NavLink>
                            </li> 
                            <li className="dropdown">
                                <NavLink to="/admin/order-list" className="dropdown-toggle">
                                    <span className="micon dw dw-house-1"></span><span className="mtext">
                                        <FaCartPlus></FaCartPlus>
                                        Orders</span>
                                </NavLink>
                            </li>                   
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}