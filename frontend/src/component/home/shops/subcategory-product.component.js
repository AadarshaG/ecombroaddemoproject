import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { HttpClient } from '../../../utility/httpclient';

export function SubcategoryProduct(){

	const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    //sort data
    const [sortProduct, setSortProduct] = useState('none');
	const sortMethods = {
		none: { method: (a, b) => null },
		ascending: { method: undefined },
		descending: { method: (a, b) => (a > b ? -1 : 1) },
		// oldest: {method: (a,b)=>(b.created_at - a.created_at)},
		// newest: {method: (a,b)=>(a.created_at - b.created_at)},
		// lowest: {method: (a,b)=>(a.price > b.price)},
		// highest: {method: (a,b)=>(a.price < b.price)},
	  };

    const params = useParams();

    useEffect(()=>{
        const http = new HttpClient();
        http.getItemById('category/'+params.id,true)
        .then((response)=>{
            if(response.data.status){
				//console.log('Subcategory Name',response.data.data);
                setSubcategory(response.data.data);
            }
        })
        .catch((error)=>{
            //console.log('Error',error);
        })
    }, []);

	useEffect(()=>{
		const http = new HttpClient();
		http.getItem('category',{
			headers:{
				'authorization':localStorage.getItem('token')
			}
		})
        .then((response)=>{
            if(response.data.status){
				let parent_cats = response.data.data.filter((obj)=>(obj.parent_id === null));
                setCategory(parent_cats);
            }
        })
        .catch((error)=>{
            //console.log('Error',error);
        })
	},[]);

    useEffect(()=>{
        const http = new HttpClient();
		http.getItem('product',{
			headers:{
				'authorization': localStorage.getItem('token')
			}
		})
		.then((response)=>{
			if(response.data.status){
				//console.log('All Products', response.data.data);
				let subcats_products = response.data.data.filter((o) => (o.child_cat_id === params.id));
				//console.log('Subcategory Products', subcats_products);
				setAllProducts(subcats_products);
			}
		})
		.catch((error)=>{
			//console.log('Error',error);
		})
    },[]);

    return(
        <>
            <section className="page-banner">
				<div className="container">
					<div className="page-title-bar">
						<div className="page-title">
							{subcategory.name}
						</div>
						<div className="page-breadcrumb">
							<NavLink to={'/'}>Home</NavLink> | {subcategory.name}
						</div>
					</div>
				</div>
			</section>

			<section id="shopPage" className="section-padd">
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<h4>Filter</h4>
							<hr/>
							{
								category.map((obj,ind)=>(
									<div className="cat-li" key={ind}>
										<NavLink to={'/category/'+ obj._id} className="collapsed">
											{obj.name}
										</NavLink>
									</div>
								))
							}							
						</div>
						<div className="col-md-9">
							<div className="sort-bar">
								<select id="sortFilter" onChange={(ev)=>setSortProduct(ev.target.value)}>
									<option value="newest">Newest</option>
									<option value="oldest">Oldest</option>
									<option value="lowest">Lowest Price</option>
									<option value="highest">Highest Price</option>
								</select>
							</div>
							<div className="row">
								{
									allProducts.sort(sortMethods[sortProduct].method).map((obj,ind)=>(
										<div className="col-md-4" key={ind}>
											<div className="product-card">
												<div className="product-card-img-wrap">
													<img className="product-card-img-1" src={process.env.REACT_APP_IMAGE_URL + '/' + obj.image} alt="" />
													<div className="product-card-btn">
														<NavLink to={'/product/detail/'+obj._id}>Shop Now</NavLink>
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