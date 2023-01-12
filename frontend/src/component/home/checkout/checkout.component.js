import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { HttpClient } from '../../../utility/httpclient';
import { toast } from 'react-toastify';

import {useSelector} from 'react-redux';

export function Checkout(){

    const commonFields = {
        user_id: null,
        lastname: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        street: '',
    };

    const userId = useSelector((state) => state.user );
    console.log('User Id', userId);

    const [customerData, setCustomerData] = useState(commonFields);
    const [customerDataErr, setCustomerDataErr] = useState(commonFields);

    const [cartData, setCartData] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const navigate = useNavigate();

    // useEffect(() =>{
    //     const http = new HttpClient();

    //     let carts = JSON.parse(localStorage.getItem('_cart'));
    //     let user = JSON.parse(localStorage.getItem('user'));
    //     carts.map((o,i) => {
    //         o.user_id = user.id;
    //         o.status = 'new'
    //     });
    //     http.postItem('/cart',carts,{
    //         headers:{
    //             'authorization': localStorage.getItem('token')
    //         }
    //     })
    //     .then((response) =>{
    //         if(response.data.status){
    //             toast.success('Cart has been created successfully.');
    //             localStorage.removeItem('_cart');
    //             navigate('/');
    //         }
    //     })
    //     .catch((error) =>{
    //         toast.error('Sorry,Your cart cannot be created at this moment.');
    //         navigate('/cart');
    //     })
    // },[]);

    useEffect(() =>{
        let total = '';
        let cartData = JSON.parse(localStorage.getItem('_cart'));
       
        if(cartData){
            cartData.map((o,i)=>{
                total = Number(o.total_amount) + Number(total);
            })
            setCartTotal(total);
        }
       // console.log('Cart Total',total);
        setCartData(cartData);
       // console.log('Cart Data',cartData);
    },[]);

    useEffect(()=>{
        // let user = JSON.parse(localStorage.getItem('user'));
        // console.log('Login  User Id',user.id);
        setCustomerData({
            ...customerData,
           // user_id: customerData.user_id,
            
        })
    },[]);

    const handleChange = (ev) =>{
        const {name,value} = ev.target;
        setCustomerData({ ...customerData, [name]: value });
		setCustomerDataErr(validate(customerData));
    }

    const validate = (values) =>{
        const errors = {};
        if(!values.lastname){
            errors.lastname = "Last Name is required!";
        }
        if(!values.phone){
            errors.phone = "Phone Number is required!";
        }
        if(!values.country){
            errors.country = "Country Name is required!";
        }
        if(!values.state){
            errors.state = "State Name is required!";
        }
        if(!values.city){
            errors.city = "City Name is required!";
        }
        if(!values.street){
            errors.street = "Street Name is required!";
        }
        return errors;
    }

    const uploadDetail = () =>{
        if(customerData.user_id){
           // let user = JSON.parse(localStorage.getItem('user'));

            const http = new HttpClient();
            http.postItem('user-detail',customerData,{
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json",
            })
            .then((response) =>{
                if(response.data.status){                
                    setCustomerData(response.data.data);
                }
            })
            .catch((error)=>{
                toast.error('Error while Submiting Order.');
            })
        }
    }

    const handleSubmit = (ev) =>{
        ev.preventDefault();
        setCustomerDataErr(validate(customerData));
        uploadDetail();

        // const http = new HttpClient();
        // let carts = JSON.parse(localStorage.getItem('_cart'));
        // let user = JSON.parse(localStorage.getItem('user'));
        // carts.map((o,i) => {
        //     o.user_id = user.id;
        //     o.status = 'new'
        // });
        // http.postItem('/cart',carts,{
        //     headers:{
        //         'authorization': localStorage.getItem('token')
        //     }
        // })
        // .then((response) =>{
        //     if(response.data.status){
        //         toast.success('Cart has been created successfully.');
        //         localStorage.removeItem('_cart');
        //         navigate('/');
        //     }
        // })
        // .catch((error) =>{
        //     toast.error('Sorry,Your cart cannot be created at this moment.');
        //     navigate('/cart');
        // })
    }

    return(
        <>
        {/* let user = JSON.parse(localStorage.getItem('user')); */}
            <section className="page-banner">
                <div className="container">
                    <div className="page-title-bar">
                        <div className="page-title">
                            Check Out
                        </div>
                        <div className="page-breadcrumb">
                            <NavLink to={'/'}>Home</NavLink> | Check Out
                        </div>
                    </div>
                </div>
            </section>

            <section id="cartSection">
                <div className="py-5">
                    <em><b>Your order is ready. Please complete the billing information below for checkout.</b></em>
                </div>
                <div className="billing-information">
                    <h4 className="mb-4">Billing Information</h4>
                    <div id="billingForm">
                    
                    <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" name="firstname" onChange={handleChange} placeholder="First Name" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="lastname" onChange={handleChange} placeholder="Last Name" />
                                        <span className="text-danger">{customerDataErr.lastname}</span>
                                    </div>
                                </div>
                                <input type="text" name="phone" onChange={handleChange} placeholder="Phone Number" />
                                <span className="text-danger">{customerDataErr.phone}</span>
                                <input type="email" name="email" defaultValue="" placeholder="E-mail" />
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" name="country" onChange={handleChange} placeholder="Country" />
                                        <span className="text-danger">{customerDataErr.country}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="state" onChange={handleChange} placeholder="State" />
                                        <span className="text-danger">{customerDataErr.state}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input type="text" name="city" onChange={handleChange} placeholder="City" />
                                        <span className="text-danger">{customerDataErr.city}</span>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" name="street" onChange={handleChange} placeholder="Street Address" />
                                        <span className="text-danger">{customerDataErr.street}</span>
                                    </div>
                                </div>
                            </div>
                                
                            <div className="col-md-6 mb-5">
                                <div className="your-order-box">
                                    <h5 className="mb-4">Your Order</h5>
                                
                                    <div className="ordered-products">
                                        
                                        <div className="ordered-div">
                                            <div><b>Product</b></div>
                                            <div><b>Qty</b></div>
                                            <div><b>Price</b></div>
                                        </div>
                                        <hr />
                                        {
                                            cartData && cartData.map((o,i) =>(
                                                <div className="ordered-div" key={i}>
                                                    <div>{o.name}</div>
                                                    <div>{o.qty}</div>
                                                    <div>{o.total_amount}</div>
                                                </div>
                                            ))
                                        }
                                        
                                        <hr />
                                        <div className="ordered-div">
                                            <div>Subtotal</div>
                                            <div>{cartTotal}</div>
                                        </div>
                                        <div className="ordered-div">
                                            <div>Delivery Charge</div>
                                            <div>0</div>
                                        </div>
                                        <hr />
                                        <div className="ordered-div">
                                            <div><b>Total</b></div>
                                            <div><b>{cartTotal}</b></div>
                                        </div>
                                        <button type="submit" className="login-btn wid100">Complete Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}