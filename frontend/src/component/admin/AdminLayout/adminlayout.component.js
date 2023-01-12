import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Aside } from '../sections/aside.component';
import { Topnav } from '../sections/topnav.component';

import '../../../css/admin/src/styles/style.css';

export function AdminLayout(){
    return(
        <>
            <Topnav></Topnav>
            <Aside></Aside>

            <div className="main-container">
                <div className="pd-ltr-20 xs-pd-20-10">
                    <div className="min-height-200px">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="title">
                                        <h6><NavLink to="/admin">Dashboard</NavLink></h6>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 text-right">
                                    
                                </div>
                            </div>
                        </div>
                       
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    );
}