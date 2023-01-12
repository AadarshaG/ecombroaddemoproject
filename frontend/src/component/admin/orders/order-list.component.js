import React, { useEffect, useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { HttpClient } from '../../../utility/httpclient';
import moment from 'moment';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export function OrderList(){

    const [cartList,setCartList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() =>{
        //console.log('I am Here');
        const http = new HttpClient();
        http.getItem('cart', {
            headers:{
                'authorization': localStorage.getItem('token')
            }
        })
        .then((response) => {
           // console.log('Cart Response',response);
            if(response.data.status){
              //  console.log('Cart Data',response.data.data);
                setCartList(response.data.data);
                setIsLoading(false);
            }
        })
        .catch((error) => {
            //
        })
    },[isLoading]);

    const deleteItem = (index,id) => {
        const http = new HttpClient();
        http.deleteItem('cart/' +id, true)
        .then((response) =>{
            if(response.data.status === true){
                toast.success(response.data.msg);

                let allCart = cartList.filter((ob,i) =>(i !== index));
                setCartList(allCart);
            }else{
                toast.error(response.data.msg);
            }
        })
        .catch((error) =>{
            console.log('Error',error);
        })
    }


    return(
        <>
            <div className="card-box mb-30">
                <div className="pd-20">
                    <h4 className="text-blue h4">Order Lists
                    </h4>             
                </div>
                <div className="pb-20">
                <table className='table table-sm table-hover table-border'>
                        <thead className='table-dark'>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Product</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Action</th>
                        </tr> 
                        </thead>
                        <tbody>
                            {
                                cartList.map((object,index)=> (
                            
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{object.user_id.name}</td>
                                        <td>{object.product_id.name}</td>
                                        <td>{object.status}</td>
                                        <td>{moment(object.createdAt).format('MMM-DD-YYYY')}</td>
                                        <td>
                                            <NavLink to={'/admin/order-detail/'+ object._id} className="btn btn-sm btn-primary btn-circle" >
                                                <FaEye></FaEye>
                                            </NavLink>

                                            &ensp;
                                            <button className="btn btn-sm btn-danger btn-circle" value={object._id} onClick={(ev)=>{
                                                
                                                Swal.fire({
                                                    title: 'Are you sure?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, delete it!'
                                                }).then((result) => {
                                                    if(result.isConfirmed){
                                                        return deleteItem(index,object._id)
                                                    }
                                                })
                                            }}>
                                                <FaTrash></FaTrash>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}