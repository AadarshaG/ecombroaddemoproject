import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/home/fontawesome/css/all.min.css';
import '../../../css/home/css/custom.css';
import '../../../css/home/css/responsive.css';



import React from 'react';
import { Footer } from '../footer/footer.component';
import { HeaderSearch } from "../header/header.component";
import { Outlet } from 'react-router-dom';

export function Layout(){
    return(
        <>
          {/* <Header></Header>  */}
         <HeaderSearch></HeaderSearch>
            <div className="main-body">
                <Outlet></Outlet>
            </div>
        <Footer></Footer>
        </>
    )
}