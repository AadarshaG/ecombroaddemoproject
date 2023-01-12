import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HttpClient } from '../../../utility/httpclient';
import { toast } from 'react-toastify';


export function Footer(){

	const [email, setEmail] = useState('');
	const [emailErr, setEmailErr] = useState('');

	const [allCategory, setAllCategory] = useState([]);

	useEffect(()=>{
		setEmail({
			...email
		});
	},[]);

	useEffect(() =>{
		const http = new HttpClient();
		http.getItem('category',{
			headers:{
                'authorization': localStorage.getItem('token')
            }
		})
		.then((response) =>{
			if(response.data.status){
				
				let cats = response.data.data.filter((obj)=>(obj.parent_id === null));
				//console.log('Cats',cats);
				setAllCategory(cats);
			}
		})
		.catch((error)=>{
			//
		})
	},[]);

	const handleChange= (ev) =>{
		const {name,value} = ev.target;
		setEmail({...email, [name] : value});
		setEmailErr(validate(email));
	}

	const validate = (value) =>{
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //find out about regex
		if(!value.email){
			errors.email = "Email is required!";
		  } else if (!regex.test(value.email)) {
			errors.email = "This is not a valid email format!";
		}
		return errors;
	}

	const Subscribe = () => {
		const http = new HttpClient();
		http.postItem('subscriber',email,{
			"Access-Control-Allow-Origin": "*",
			"content-type": "application/json",
		})
		.then((response) =>{
			// console.log('Subscribe response',response);
			if(response.data.status){
				toast.success('Subscribe Successfully.');
				setEmail(response.data.data);
			}
		})
		.catch((error)=>{
			toast.error('Could not subscribe at this moment.');
		})
	}

	const handleSubmit = (ev) =>{
		ev.preventDefault();
		setEmailErr(validate(email));
		Subscribe();
	}

  return(
		<>
			<footer>
				<div id="preFooter">
					<div className="container">
						<div className="row">
							<div className="col-md-3 first">
								<div className="footer-title">Categories</div>
								{
									allCategory && allCategory.map((o,i) =>(
										<div className="footer-li" key={i}>
											<NavLink to={'/category/'+ o._id}>{o.name}</NavLink>
										</div>
									))
								}
								
							</div>
							<div className="col-md-3 second">
								<div className="footer-title">Help</div>
								<div className="footer-li"><NavLink to="">Custom Order</NavLink></div>
								<div className="footer-li"><NavLink to="">Returns Policy</NavLink></div>
							
							</div>
							<div className="col-md-3 third">
								<div className="footer-title">Get in Touch</div>
								
								<div className="footer-li">
									<i className="fa fa-map-marker-alt"></i>
									Kathmandu, Nepal
								</div>
								<div className="footer-li">
									<i className="fa fa-phone"></i>
									+977 9843821265
								</div>
								<div className="footer-li">
									<i className="fa fa-envelope"></i>
									info@developer.com
								</div>
								<div className="footer-social">
									<NavLink to="https://www.facebook.com/" >
										<i className="fab fa-facebook-f"></i>
									</NavLink>
									<NavLink to="https://www.instagram.com/" >
										<i className="fab fa-instagram"></i>
									</NavLink>
									<NavLink to="https://www.youtube.com/" >
										<i className="fab fa-youtube"></i>
									</NavLink>
								</div>
							</div>
							<div className="col-md-3 fourth">
								<div className="footer-title">Newsletter</div>
								<form id="footerSubscribe" onSubmit={handleSubmit}>
									<input type="email" name="email" onChange={handleChange} placeholder="email@example.com" />
									<span className="text-danger">{emailErr.email}</span>
									<button type="submit">Subscribe</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</footer>	
		</>
  )
}