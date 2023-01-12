import React, { useEffect, useState } from 'react';
import { setResult } from '../../../actions/search-actions';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

function SearchList(props){

    const [isLoading, setIsLoading] = useState(false);
    // let keyword = localStorage.getItem('search');
    useEffect(() => {
        //console.log('Search',props);
          let {keyword} = props;
         if(!keyword.search.keyword){
             setIsLoading(true);
         }
        props.setResult(keyword.search.keyword);
    },[isLoading]);

    return(
        <>
            <section className="page-banner">
                <div className="container">
                    <div className="page-title-bar">
                        <div className="page-title">
                           Search Results
                        </div>
                        <div className="page-breadcrumb">
                            <NavLink to={'/'}>Home</NavLink> | Search
                        </div>
                    </div>
                </div>
            </section>

            <section id="shopPage" className="section-padd">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">

                                {
                                    props.SearchResult.map((obj,ind)=>(
                                        <div className="col-md-4" key={ind}>
                                            <div className="product-card">
                                                <div className="product-card-img-wrap">
                                                    <img className="product-card-img-1" src={process.env.REACT_APP_IMAGE_URL + '/' + obj['image']} alt="" />
                                                    <div className="product-card-btn">
                                                        <NavLink to="">Shop Now</NavLink>
                                                    </div>
                                                </div>
                                                <div className="product-card-title">
                                                    <NavLink to="">
                                                        {obj.name}
                                                    </NavLink>
                                                </div>
                                                <div className="product-card-price-wish">
                                                    <div className="product-card-price">
                                                        ${obj.price}
                                                    </div>
                                                    <div className="product-card-wish">
                                                        <i className="far fa-heart"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
		    </section>
        </>
    );
}

const mapStateToProps = (rootStore) => ({
    keyword: rootStore,
    SearchResult: rootStore.search['searchResult']
})

const mapDispatchToProps = {
    setResult: setResult
}


export const SearchResult = connect(mapStateToProps, mapDispatchToProps)(SearchList);