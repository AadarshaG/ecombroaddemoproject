import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HttpClient } from '../../../utility/httpclient';

export function Register(){

	const commonUserFields = {
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
		is_admin: false
	  };
	  
	  const [userValue, setUserValue] = useState(commonUserFields);
	  const [userValueError, setUserValueError] = useState(commonUserFields);

	  const navigate = useNavigate();
	  const http = new HttpClient();

	  useEffect(()=>{
		setUserValue({
			...userValue
		  })
	  }, []);

	  
	const handleChange = (ev) => {
		const { name, value } = ev.target;
		setUserValue({ ...userValue, [name]: value });
		setUserValueError(validate(userValue));
	}

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //find out about regex
		if(!values.name){
            errors.name = "User name is required!";
        }
		if (!values.email) {
			errors.email = "Email is required!";
		  } else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		  }
		  if (!values.password) {
			errors.password = "Password is required";
		  } else if (values.password.length < 8) {
			errors.password = "Password must be more than 8 characters";
		  }
		  if (!values.password_confirmation) {
			errors.password_confirmation = "Password confirmation is required";
		  } else if (!values.password_confirmation === values.password) {
			errors.password_confirmation = "Password didn't match";
		  }

        return errors;
	}

	const handleSubmit = (ev) => {
		ev.preventDefault();
		//console.log('User Data',userValue);
		setUserValueError(validate(userValue));
		if (Object.keys(userValueError).length === 0) {
		  uploadForm();
		} else {
		  console.log(
			"Not Ready To Register because ",
			"user error=",
			Object.keys(userValueError).length
		  );
		}
	}

	const uploadForm = () =>{
		//console.log("UserData",userValue);
		http.postItem('user', userValue, {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        })
        .then((response) => {
          if (response.data.status === 400) {
			toast.success('Register Successfully.');
			navigate('/login');
          } else {
            toast.error('Could not register at this moment.');
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
	}

	return(
		<>
			<section className="page-banner">
				<div className="container">
					<div className="page-title-bar">
						<div className="page-title">
							Register
						</div>
						<div className="page-breadcrumb">
							Home | Register
						</div>
					</div>
				</div>
			</section>

			<section id="registerSection" className="section-padd">
				<div className="container">
					<div className="row">
						<div className="col-md-6 mb-5">
							<h6 className="mb-4">If you already have an account with us. Please login at the login page.</h6>
							<h5 className="mb-3">Your Details</h5>
							<form id="registerForm">
								<div className="form-div">
									<div className="row">
										<div className="col-md-6">
											<input type="text" name="name" onChange={handleChange} placeholder="First Name" />
											<span className="text-danger">{userValueError.name}</span>
										</div>
										
									</div>
								</div>
								
								<div className="form-div">
									<input type="email" name="email" onChange={handleChange} placeholder="E-mail Address" />
									<span className="text-danger">{userValueError.email}</span>
								</div>
								<h5 className="mb-3">Password</h5>
								<div className="form-div">
									<input type="password" name="password" onChange={handleChange} placeholder="New Password" />
									<span className="text-danger">{userValueError.password}</span>
								</div>
								<div className="form-div">
									<input type="password" name="password_confirmation" onChange={handleChange} placeholder="Confirm Password" />
									<span className="text-danger">{userValueError.password_confirmation}</span>
								</div>
								<button type="submit" className="form-btn"  onClick={handleSubmit}>Sign Up</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}