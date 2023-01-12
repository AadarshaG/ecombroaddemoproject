import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


export function CartData(){

    const [cart, setCart] = useState([]);
    const [display, setDisplay] = useState([]);

   useEffect(() =>{
    let allCarts = JSON.parse(localStorage.getItem('_cart'));
    setDisplay(allCarts);
   },[cart]);


   const deleteFromCart = (i) =>{
    let cartItems = JSON.parse(localStorage.getItem('_cart'));
    cartItems.splice(i,1);
    localStorage.setItem('_cart',JSON.stringify(cartItems));
    setCart(cartItems);
   }

    return(
        <>
           <section className="page-banner">
                <div className="container">
                    <div className="page-title-bar">
                        <div className="page-title">
                            Cart Details
                        </div>
                        <div className="page-breadcrumb">
                            <NavLink to={'/'}>Home</NavLink> | Cart Details
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
                            <th className="table-qty">Quantity</th>
                            <th className="table-price">Price</th>
                            <th className="table-total">Total</th>
                            <th  className="table-delete"></th>
                        </tr>
                        {
                            display && display.map((obj,ind)=>(
                                <tr key={ind}>
                                <td>{ind+1}</td>
                                <td>
                                    <NavLink to={'/product/detail/'+ obj.product_id}>
                                        <img className="table-p-img" src={obj.image} />
                                    </NavLink>
                                </td>
                                <td>{obj.name}</td>
                                <td>
                                    {obj.qty}
                                </td>
                                <td>{obj.price}</td>
                                <td>{obj.total_amount}</td>
                                <td className="table-delete">
                                    <button>
                                        <i className="far fa-times-circle" onClick={() => {
                                            deleteFromCart(ind);
                                        }}></i>
                                    </button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
                <br></br>
                <NavLink to={'/checkout'} className="btn btn-sm float-right">
                  <button className="btn btn-sm btn-primary"> Checkout</button>
                </NavLink>
            </section>
        </>
    );
}