import React from 'react';

export function SimilarProduct(){
    return(
        <>
             <section id="similarProducts" className="section-padd">
                <div className="container">
                    <div className="section-title">
                        Similar Products
                    </div>
                    <div className="owl-carousel owl-theme" id="similarProductSlider">
                        <div className="item">
                            <div className="product-card">
                                <div className="product-card-img-wrap">
                                    <img className="product-card-img-1" src="img/p1.jpg" />
                                    <img className="product-card-img-2" src="img/p2.jpg" />
                                    <div className="product-card-btn">
                                        <a href="singleproduct.html">Shop Now</a>
                                    </div>
                                </div>
                                <div className="product-card-title">
                                    <a href="singleproduct.html">
                                        Lorem ipsum dolor sit amet
                                    </a>
                                </div>
                                <div className="product-card-price-wish">
                                    <div className="product-card-price">
                                        $120.99
                                    </div>
                                    <div className="product-card-wish">
                                        <i className="far fa-heart"></i>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </section>
        </>
    );
}