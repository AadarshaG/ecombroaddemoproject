import React from 'react';
import { NavLink } from 'react-router-dom';

export function Topnav(){
    
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    return(
        <>
            <div className="header">
                <div className="header-left">
                    <div className="menu-icon dw dw-menu"></div>
                    <div className="search-toggle-icon dw dw-search2" data-toggle="header_search"></div>
                    <div className="header-search">
                        
                    </div>
                </div>
                <div className="header-right">
                    <div className="dashboard-setting user-notification">
                        <div className="dropdown">
                            
                        </div>
                    </div>
                    <div className="user-notification">
                        <NavLink to={'/'}>
                            Home
                        </NavLink>
                    </div>&ensp;&ensp;&ensp;
                    <div className="user-info-dropdown">
                    <span>{user.name}</span> &ensp;|
                        <div className="dropdown">
                            <NavLink to="/logout">
                               Logout
                            </NavLink>
                           
                        </div>
                    </div>
                </div>
	        </div>
        </>
    );
}