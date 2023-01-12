import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import { HttpClient } from '../../../utility/httpclient';
import moment from 'moment';

export function OrderDetail(){

    const [cartData,setCartData] = useState([]);

    const params = useParams();

    useEffect(() =>{
       // console.log('I am Here');
        const http = new HttpClient();
        http.getItemById('cart/'+ params.id,true)
        .then((response) => {
           // console.log('Cart Response',response);
            if(response.data.status){
                console.log('Cart Detail',response.data.data);
                setCartData(response.data.data)
            }
        })
        .catch((error)=>{
            //
        })
    },[]);
    
    return(
        <>
            <div className="content-wrapper">
                <div className="col-md-12">
                    <div className="box box-primary">
                        <div className="box-header">
                            <h3>
                                Order Details
                            </h3>
                            <hr></hr>
                        </div>
                        <div className="box-body" >
                            <h4>User/Shipping Details</h4>
                            <ul className="list-group col-md-6">
                                <li className="list-group-item">
                                    <strong>Ordered By</strong> : 
                                </li>
                                <li className="list-group-item">
                                    <strong>Email</strong> : 
                                </li>
                                
                                <li className="list-group-item">
                                    <strong>Created at</strong> : {moment(cartData.createdAt).format('MMM DD YYYY')}
                                </li>
                                <li className="list-group-item">
                                    <strong>Shipping Details</strong>
                                </li>
                                <li className=" list-group-item">
                                    <strong>Phone Number</strong> : 
                                </li>
                                <li className=" list-group-item">
                                    <strong>Country</strong> : 
                                </li>
                                <li className=" list-group-item">
                                    <strong>State</strong> : 
                                </li>
                                <li className=" list-group-item">
                                    <strong>City</strong> : 
                                </li>
                              
                                <li className=" list-group-item">
                                    <strong>Street</strong> : 
                                </li>
                                
                                {/* <li className="list-group-item">
                                    <NavLink to="" className="btn btn-primary btn-sm" target="_blank">Generate PDF</NavLink>
                                </li> */}
                            </ul>
                            <br></br>
                            <div className="col-md-12">
                                <h4>Product Details</h4>
                                <div className="table responsive">
                                    <table className="table table-striped">
                                    <thead>
                                        <th>S.No</th>
                                        <th>Product Name</th>
                                        <th>Qty</th>
                                        <th>Total price</th>
                                        <th>Status</th>
                                    </thead>
                                    <tbody>
                                       
                                        <tr>
                                            <td>1.</td>
                                            <td></td>
                                            <td>{cartData.qty}</td>
                                            <td>{cartData.total_amount}</td>
                                            <td>{cartData.status}</td>
                                            <td><label className="badge badge-primary"></label></td>
                                        </tr>
                                        
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><strong>Grand Total</strong></td>
                                            <td><strong>{cartData.total_amount}</strong></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                    </table>                            
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}