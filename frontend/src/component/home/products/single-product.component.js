import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HttpClient } from '../../../utility/httpclient';
import {toast} from 'react-toastify';

import {useDispatch} from 'react-redux';
// import { addToCartAction } from '../../../actions/cartcounter-action';
// import { connect } from 'react-redux';

export function ProductDetail(){

    const [product, setProduct] = useState('');

    const [quantity,setQuantity] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0);

    const params = useParams();

    useEffect(()=>{
        const http = new HttpClient();
        http.getItemById('product/' + params.id,true)
        .then((response)=>{
            //console.log('Single Product Page Response',response);
            if(response.data.status){
                let allData = JSON.parse(response.data.data);
                setProduct(allData);
                // console.log('Product',product);
            }else{
               // navigate to 404 page
            }
        })
        .catch((error)=> {
           console.log('Error',error);
        })
    }, []);

    const addToCart = () =>{
        let cart = [];
        if(localStorage.getItem('_cart')){
            cart = localStorage.getItem('_cart');
            cart = JSON.parse(cart);
        }
        let current_item = {
            product_id: product._id,
            qty: quantity,
            total_amount: totalAmount,
            name: product.name,
            price: product.price,
            image: process.env.REACT_APP_IMAGE_URL+'/'+product.image
        };

        if(cart.length){
            cart.map((o)=>{
                if(o.product_id === current_item._id){
                    o.quantity = Number(o.quantity) + Number(quantity);
                    o.total_amount = Number(o.total_amount) + Number(totalAmount);
                }else{
                    cart.push(current_item);
                }
            })
        }else{
            cart.push(current_item);
        }
        localStorage.setItem('_cart',JSON.stringify(cart));        
        toast.success('Product added in the cart.');
    }

    const addToWishlist = () =>{
        let wishlist = [];

        if(localStorage.getItem('wishlist')){
            wishlist = localStorage.getItem('wishlist');
            wishlist = JSON.parse(wishlist);
        }
        let wishlist_item = {
            product_id: product._id,
            name: product.name,
            price: product.price,
            image: process.env.REACT_APP_IMAGE_URL + '/' + product.image
        };

        if(wishlist.length){
            wishlist.map((o)=>{
                if(o.product_id === wishlist_item._id){
                    //TODO: don't add same product in the wishlist
                    return {};
                   // toast.error('Already in the wishlist.');
                }else{
                    wishlist.push(wishlist_item);
                }
            })
        }else{
            wishlist.push(wishlist_item);
        }
        // wishlist.push(wishlist_item);
        localStorage.setItem('wishlist',JSON.stringify(wishlist));        
        toast.success('Product added in the Wishlist.');
    }

    const dispatch = useDispatch();

    // const handleAddToCart = (product) =>{
    //     dispatch(addToCartAction(product));
    // }

    return(
        <>
            <section id="singleProduct" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="exzoom" id="exzoom">
                                <div className="exzoom_img_box">
                                <ul className='exzoom_img_ul'>
                                    <li>
                                        {
                                            product && product.image &&
                                            (
                                                <img src={process.env.REACT_APP_IMAGE_URL + product['image']} alt="" />
                                            )
                                        }        
                                        
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="single-product-title">{product.name}</div>
                          
                            {
                                product && product.discount && (
                                    <div className="single-product-price">
                                        ${product.price*(1-(product.discount/100))}
                                    </div>
                                    
                                )                               
                            }

                            {
                                product && product.price &&  product.discount && (
                                    <div className="single-product-price">
                                        <del> ${product.price}</del>
                                    </div>
                                )
                            }

                            {
                            product && product.price && !product.discount && (
                                <div className="single-product-price">
                                        ${product.price}
                                </div>
                            )
                            }
                           
                            <div className="single-product-title">
                                {product.description}
                            </div>

                            <div className="single-product-size">
                                {/* Size: 
                                <select>
                                    <option value="m">M</option>
                                    <option value="l">L</option>
                                    <option value="xl">XL</option>
                                    <option value="xxl">XXL</option>
                                </select> */}
                            </div>
                            
                            <div className="single-product-btns">
                                <label><strong>Quantity: &ensp;&ensp;</strong>    </label>
                                <input type="number" name="quantity" min={1} onChange={(ev)=>{
                                    setQuantity(ev.target.value);
                                    setTotalAmount(ev.target.value * product.price);
                                }} className="form form-control" placeholder='1'></input>
                            </div>
                            <div className="single-product-btns">
                                <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
                                <i className="far fa-heart"  onClick={addToWishlist}></i>
                                 {/* <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                <i className="far fa-heart"  onClick={addToWishlist}></i> */}
                            </div>
                            <div className="single-product-short-desc">
                                <p>
                                    Free shipping on orders over $199
                                </p>
                                <p>
                                    Need plus size? Submit a custom order request 
                                </p>
                               
                            </div>
                            <a className="single-product-desc-link" data-toggle="collapse" to="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                Product Description
                                <span className="chev-down">
                                    <i className="fa fa-chevron-down"></i>
                                </span>
                            </a>
                            <div className="collapse" id="collapseExample">
                                <div className="card">
                                   {product.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

// const mapStateToProps = (rootstore) => ({
//     addToCart: rootstore.cart.addToCart,
//     addQuantity: rootstore.cart.addQuantity,
//     subtractQuantity: rootstore.cart.subtractQuantity,
// })

// const mapDispatchToProps = {
//     addToCart: addToCartAction,
//     removeFromCart: removeFromCartAction,
//     addQuantity: addQuantityAction,
//     subtractQuantity: subtractQuantityAction,
// }

// export const SingleProductDetail = connect(mapStateToProps,mapDispatchToProps)(ProductDetail); 