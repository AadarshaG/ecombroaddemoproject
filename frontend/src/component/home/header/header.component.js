import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {connect} from 'react-redux';
import { setKeywordAction } from '../../../actions/search-actions';
import { HttpClient } from '../../../utility/httpclient';

// import Toggle from 'react-switch';
import { ThemeActionTypes } from '../../../actions/theme-action';
import { CartCounterActionType } from '../../../actions/cartcounter-action';

 function Header(props){

	// console.log('Header Props',props);

	const [allCategory, setAllCategory] = useState([]);
//	const [allSubCategory, setAllSubCategory] = useState([]);

	const [keyword, setKeyword] = useState('');
	const navigate = useNavigate();

	useEffect(()=>{
		const http = new HttpClient();
		http.getItem('category',{
			headers:{
                'authorization': localStorage.getItem('token')
            }
		})
		.then((response)=>{
			//console.log('Category Data', response);
			if(response.data.status)
            {
				let parent_cats = response.data.data.filter((obj)=>(obj.parent_id === null));
			//	let child_cats = response.data.data.filter((obj)=>(obj.parent_id !== null));
			//	let currentChild = child_cats.filter((o) => (o.parent_id === parent_cats));
				// console.log('Parent Cats', parent_cats);
				// console.log('Child Cats', currentChild);
				setAllCategory(parent_cats);
			//	setAllSubCategory(currentChild);
				//console.log('Child Category',child_cats);
            }
            
		})
		.catch((error)=>{
			console.log('Error', error);
		})
	}, []);

	const handleChange = (ev) => {
		// const {name} = ev.target;
		setKeyword(ev.target.value);
	}

	const handleSubmit = (ev) => {
		ev.preventDefault();
		//console.log('Search', keyword);
		 // localStorage.setItem('search',keyword);
		props.setKeyword(keyword);
		navigate('/search?keyword='+keyword);

	}
	// for showing number of item in cart
	// let cart = JSON.parse(localStorage.getItem('_cart'));
	// let total_qty = 0;
	// if(cart){
	// 	cart.map((obj) =>(
	// 		total_qty += Number(obj.qty)
	// 	))
	// }
    return(
        <>
			<header>
				<div id="desktopMenu">
					<div id="logoBar">
						<div className="container">
							<div className="row">
								<div className="col-md-3 my-auto">
									<form id="homeSearch" onSubmit={ handleSubmit }>
										<input type="search" onChange={ handleChange } placeholder="Search Product..." />
										<button type="submit">
											<i className="fa fa-search"></i>
										</button>
									</form>
								</div>
								<div className="col-md-1">
									{/* <Toggle onValue={themeOn} handleClick={() => {setThemeOn(!themeOn)}}></Toggle> */}
								</div>
								<div className="col-md-4">
									<div className="desktop-logo">
										<NavLink to={'/'}>
											<img className="header-logo" src="img/logo.jpg" alt="Logo" />
										</NavLink>
									</div>
								</div>
								<div className="col-md-4 my-auto">
									<div className="top-right">
										
										<NavLink to={'login'} className="top-links">
											Login
										</NavLink>
										<NavLink to={'register'} className="top-links">
											Register
										</NavLink>
										<NavLink to={'wishlist'} className="top-links">
											<i className="far fa-heart"></i>
											<span className="count-cart">({props.wishcounter})</span>
										</NavLink>
										<NavLink to={'/cart-detail'} className="top-links">
											<i className="fa fa-shopping-bag"></i>
											{/* <span className="count-cart">({total_qty})</span> */}
											<span className="count-cart">()</span>
										</NavLink>
									</div>
								</div>

								<div id="menuBar">
									<nav className="navbar navbar-expand-md">
										<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
											<i className="fa fa-bars"></i>
										</button>
										<div className="collapse navbar-collapse mega-bar" id="navbarToggler">
											<ul className="navbar-nav mx-auto">
												{
													allCategory.map((obj,ind)=>(
														<li className="nav-item mega-link" key={ind}>
															<NavLink to={'category/'+obj._id} className="nav-link active">{obj.name}</NavLink>
															<div className="mega-menu">
																<div className="container">
																	<div className="row">
																		<div className="col-md-3">
																			<NavLink to="" className="menu-1st-li">New Arrivals</NavLink>	
																		</div>
																		<div className="col-md-3">
																			
																		</div>
																		<div className="col-md-3">
																			
																		</div>
																		<div className="col-md-3">
																			<div className="text-right">
																				<img className="mega-image" src={process.env.REACT_APP_IMAGE_URL + '/' + obj['image']}  alt="" />
																			</div>
																		</div>
																	</div>
																</div>
															</div> 
														</li>
													))
												}
												
											</ul>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>						
				</div>
			</header>
		</>	 
    )
}

const mapStateToProps = (rootstore) => ({
	keyword: rootstore.search.keyword,
	theme : rootstore.theme.theme
})

const mapDispatchToProps = {
	setKeyword: setKeywordAction,
	setTheme: ThemeActionTypes
}
export const HeaderSearch = connect(mapStateToProps,mapDispatchToProps)(Header);