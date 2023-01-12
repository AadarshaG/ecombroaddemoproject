import React from 'react';
import { NavLink } from 'react-router-dom';

export function ErrorPage(){
    
    return(
        <>
           <div className="error-page d-flex align-items-center flex-wrap justify-content-center pd-20">
                <div className="pd-10">
                    <div className="error-page-wrap text-center">
                        <h1>404</h1>
                        <h3>Error: 404 Page Not Found</h3>
                        <p>Sorry, the page you’re looking for cannot be accessed.<br>Either check the URL</br></p>
                        <div className="pt-20 mx-auto max-width-200">
                            <NavLink to={'/'} className="btn btn-primary btn-block btn-lg">Back To Home</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}