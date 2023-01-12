import React from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

export function Dashboard(){
    const user = useSelector((state) => state.user );
    console.log('User',user);
    return(
        <h2>Hello Admin</h2>
    );
}

export function PrivateRoute({children}){
    const is_logged_in =localStorage.getItem('token');
    return is_logged_in ? children : <Navigate to="/login"></Navigate>

    // const is_logged_in = localStorage.getItem('token');
    // if(!is_logged_in){
    //     return <Navigate to="/login"></Navigate>
    // }else{
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if(user.is_admin){
    //         return children
    //     }else{
    //         return <Navigate to="/user"></Navigate>
    //     }
    // } 
}