import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HttpClient } from '../../../utility/httpclient';

export function ReviewProduct(){

    const commonFields = {
        rating: '',
        description: '',
        user_id: null
    }

    const [review, setReview] = useState(commonFields);
    const [reviewErr, setReviewErr] = useState(commonFields);

    useEffect(()=>{
        setReview({
            ...review
        });
        let user = localStorage.getItem('user');
        console.log('Login User',user);
        setLoginUser(user);
    },[]);

    const handleSubmit = (ev) =>{
        eval.preventDefault();
    }

    const handleChange = (ev) =>{
        const {name,value} = ev.target;
        setReview({...review, [name]: [value]});
        setReviewErr(validate(review));
    }

    const validate = (value) =>{
        const errors = {};
        if(!value.rating){
            errors.rating = 'Rating is required.';
        }
        if(!value.description){
            errors.description = 'Description is required.';
        }
        return errors;
    }

    return(
        <>
            <section id="singleReviewQues" className="section-padd">
                <div className="container">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#review">Write a review</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#question">Ask a question</a>
                        </li>
                    </ul>

                    
                    <div className="tab-content">
                        <div className="tab-pane container active" id="review">
                            <form id="reviewForm" onSubmit={handleSubmit}>
                                <div className="form-div">
                                    <h6>Rate the Product:</h6>
                                    <div className="rate">
                                        <input type="radio" id="star5" name="rate" onChange={handleChange} value="5" />
                                        <label for="star5" title="5 stars">5 stars</label>
                                        <input type="radio" id="star4" name="rate" onChange={handleChange} value="4" />
                                        <label for="star4" title="4 stars">4 stars</label>
                                        <input type="radio" id="star3" name="rate" onChange={handleChange} value="3" />
                                        <label for="star3" title="3 stars">3 stars</label>
                                        <input type="radio" id="star2" name="rate" onChange={handleChange} value="2" />
                                        <label for="star2" title="2 stars">2 stars</label>
                                        <input type="radio" id="star1" name="rate" onChange={handleChange} value="1" />
                                        <label for="star1" title="1 star">1 star</label>
                                    </div>
                                </div>
                                <div className="form-div">
                                    <textarea rows="4" name="description" onChange={handleChange} placeholder="Your Review"></textarea>
                                </div>
                                <div className="form-div">
                                    <button type="submit" className="form-btn">Submit Review</button>
                                </div>
                            </form>
                        </div>
                        <div className="tab-pane container fade" id="question">
                            <form id="reviewForm">
                                <div className="form-div">
                                    <input type="text" name="name" placeholder="Your Name" />
                                </div>
                                <div className="form-div">
                                    <input type="email" name="name" placeholder="Your Email Address" />
                                </div>
                                <div className="form-div">
                                    <textarea rows="4" placeholder="Your Question"></textarea>
                                </div>
                                <div className="form-div">
                                    <button type="submit" className="form-btn">Submit Question</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <h4>Customer Reviews:</h4>
                    <hr/>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="review-block">
                                <h5>ABC XYZ</h5>
                                <div className="review-date">05/20/2021</div>
                                <div className="review-stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <h6>Excellent Quality</h6>
                                <div className="review-txt">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrudp ex ea commodo
                                    consequat.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="review-block">
                                <h5>ABC XYZ</h5>
                                <div className="review-date">05/20/2021</div>
                                <div className="review-stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <h6>Excellent Quality</h6>
                                <div className="review-txt">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrudp ex ea commodo
                                    consequat.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="review-block">
                                <h5>ABC XYZ</h5>
                                <div className="review-date">05/20/2021</div>
                                <div className="review-stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <h6>Excellent Quality</h6>
                                <div className="review-txt">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrudp ex ea commodo
                                    consequat.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="review-block">
                                <h5>ABC XYZ</h5>
                                <div className="review-date">05/20/2021</div>
                                <div className="review-stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <h6>Excellent Quality</h6>
                                <div className="review-txt">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrudp ex ea commodo
                                    consequat.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}