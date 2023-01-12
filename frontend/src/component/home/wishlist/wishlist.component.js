import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import {toast} from 'react-toastify';

export function WishList(){

    const [wishProduct, setWishProduct] = useState([]);
    const [displayWish, setDisplayWish] = useState([]);

    // const [quantity, setQuantity] = useState(0);
    // const [totalAmount, setTotalAmount] = useState(0);

    useEffect(()=>{
        let wishPro = JSON.parse(localStorage.getItem('wishlist'));
        setDisplayWish(wishPro);
    },[wishProduct]);

    const deleteFromWishlist = (i) =>{
        let wishItems = JSON.parse(localStorage.getItem('wishlist'));
        wishItems.splice(i,1);
        localStorage.setItem('wishlist',JSON.stringify(wishItems));
        setWishProduct(wishItems);
    }

    // const addToCart = (i,id) =>{
    //     let cart = [];
    //     if(localStorage.getItem('_cart')){
    //         cart = localStorage.getItem('_cart');
    //         cart = JSON.parse(cart);
    //     }
    //     let current_item = {
    //         product_id: o._id,
    //         qty: quantity,
    //         total_amount: totalAmount,
    //         name: o.name,
    //         price: o.price,
    //         image: process.env.REACT_APP_IMAGE_URL+'/'+o.image
    //     };

    //     if(cart.length){
    //         cart.map((o)=>{
    //             if(o.product_id === current_item._id){
    //                 o.quantity = Number(o.quantity) + Number(quantity);
    //                 o.total_amount = Number(o.total_amount) + Number(totalAmount);
    //             }else{
    //                 cart.push(current_item);
    //             }
    //         })
    //     }else{
    //         cart.push(current_item);
    //     }
    //     localStorage.setItem('_cart',JSON.stringify(cart));        
    //     toast.success('Product added in the cart.');
    // }

    return(
        <>
           <section className="page-banner">
                <div className="container">
                    <div className="page-title-bar">
                        <div className="page-title">
                            Wishlist Details
                        </div>
                        <div className="page-breadcrumb">
                            <NavLink to={'/'}>Home</NavLink> | Wishlist Details
                        </div>
                    </div>
                </div>
            </section>

            <section className="cart-page cart-detail">
                <div className="container">
                    <table id="cartTable">
                        <tbody>
                            <tr>
                                <th className="table-sn">SN</th>
                                <th className="table-img"></th>
                                <th className="table-product">Product Name</th>
                                <th className="table-price">Price</th>
                                <th  className="table-delete"></th>
                            </tr>
                            {
                                displayWish && displayWish.map((obj,ind)=>(
                                    <tr key={ind}>
                                    <td>{ind+1}</td>
                                    <td>
                                        <NavLink to={'/product/detail/'+ obj.product_id}>
                                            <img className="table-p-img" src={obj.image} alt="" />
                                        </NavLink>
                                    </td>
                                    <td>{obj.name}</td>
                                    
                                    <td>{obj.price}</td>
                                    <td className="table-delete">
                                        {/* <button>
                                            <i className="far fa-plus-circle" onClick={() =>{
                                                addToCart(ind,obj.product_id)
                                            }}></i>
                                        </button>
                                        &ensp;&ensp; */}
                                        <button>
                                            <i className="far fa-times-circle" onClick={() => {
                                                deleteFromWishlist(ind);
                                            }}></i>
                                        </button>
                                    </td>
                                </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>                
            </section>
        </>
    );
}