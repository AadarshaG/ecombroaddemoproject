import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { useSelector, useDispatch } from "react-redux";
// import { fetchUserSuccess } from '../../../actions/user-action';
// import { connect } from 'react-redux';
// import { UserActionTypes} from '../../../actions/user-action';

const BASE_URL = process.env.REACT_APP_BASE_URL;

 export function Login(){
	// console.log('Props',props);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

	//const dispatch = useDispatch();

	 //const userInfo = useSelector((state) => state.user.user );
     //console.log('User List',props.user);

	const handleChange = (e) => {
		const {name,value} = e.target;
		
        if(name === 'email'){
            if(value && value.includes('@') && value.includes('.com')){
                setEmailErr('');
            }else{
                setEmailErr('Invalid email format.');
            }
            setEmail(value);
        }

        if(name === 'password'){
            if(value && value.length >= 8){
                setPasswordErr('');
            }else{
                setPasswordErr('Password length does not match.');
            }
            setPassword(value);
        }
	}

	const handleSubmit = (ev) =>{
		ev.preventDefault();

		axios.post(`${BASE_URL}auth/login`,{
			email: email,
            password: password
		},{
			headers:{
			 "content-type": "application/json"
			}
		 })

		 .then((response) => {
			if(!response.data.data){
                //msg
                toast.error('User not found');
            }
            localStorage.setItem('token',response.data.data.token);
            // to display user name in dashboard
			// dispatch(fetchUserSuccess(response.data.data));
            let user = {
                name: response.data.data.user.name,
                email: response.data.data.user.email,
				is_admin: response.data.data.user.is_admin,
				id: response.data.data.user._id,
            }
            localStorage.setItem('user',JSON.stringify(user));
           // navigate('/admin');
		   if(response.data.data.user.is_admin){
			 navigate('/admin');
		   }else{
			navigate('/user');
		   }
		 })

		 .catch((error) =>{
			//
		 });
	}

	useEffect(()=>{
		const logged_in = localStorage.getItem('token');
        if(logged_in){
            navigate('/admin');
        }
	});
	return(
		<>
			<section className="page-banner">
				<div className="container">
					<div className="page-title-bar">
						<div className="page-title">
							Login
						</div>
						<div className="page-breadcrumb">
							Home | Login
						</div>
					</div>
				</div>
			</section>

			<section id="loginSection" className="section-padd">
				<div className="container">
					<div className="row">
						<div className="col-md-5">
							<h5 className="mb-3">New Customer</h5>
							<h6>Create New Account</h6>
							<p>By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have perviously made.</p>
							<NavLink className="form-btn" to={'/register'}>Continue</NavLink>
						</div>
						<div className="col-md-5 mb-5">
							<h5 className="mb-3"> Already Registered </h5>
							<h6 className="mb-3"> Login to your Account </h6>
							<form id="loginForm" method="post" onSubmit={handleSubmit}>
								<div className="form-div">
									<input type="text" name="email" onChange={handleChange} placeholder="Email Address" />
									<span className="text-danger">{emailErr.email}</span>
								</div>
								<div className="form-div">
									<input type="password" name="password" onChange={handleChange} placeholder="Password" />
									<span className="text-danger">{passwordErr.password}</span>
								</div>
								{/* <div className="mb-3">
									<NavLink to="">Forgot Password?</NavLink>
								</div> */}
								<button type="submit" className="form-btn">Login</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

// const mapStateToProps = (rootstore) => ({
// 	user: rootstore.user.user
// })

// const mapDispatchToProps = {
// 	setUserAction: UserActionTypes
// }

// export const Login = connect(mapStateToProps,mapDispatchToProps)(LoginUser);