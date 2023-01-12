import React, { useEffect, useState } from 'react';
import { HttpClient } from '../../../utility/httpclient';
import {FaPaperPlane} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function ProductForm(){

    const commonFields = {
        name: '',
        price:'',
        discount:'',
        description:'',
        is_featured:'',
        status:'',
        cat_id:'',
        child_cat_id:'',
    };
    
    const [productData, setProductData] = useState(commonFields);    
    const [productDataErr, setProductDataErr] = useState(commonFields); 

    const [imageFileUpload, setImageFileUpload] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [allParents, setAllParents] = useState([]);
    const [allChilds, setAllChilds] = useState([]);
   // const [childCats, setChildCats] = useState([]);

   const navigate = useNavigate();


    useEffect(()=>{

        let parent_cats = [];
        let all_childs = [];

        const http = new HttpClient();
        http.getItem(`category`,{
            headers:{
                "authorization": localStorage.getItem('token')
            }
        })
        .then((response)=>{
            if(response.data.status){
                parent_cats = response.data.data.filter((o) => (o.parent_id == null));
                all_childs = response.data.data.filter((o) => (o.parent_id != null));
                setAllParents(parent_cats);
                setAllChilds(all_childs);
            }
        })
        .catch((error)=>{
            console.log("Error", error);
        })
    }, [isLoading]);

    const handleChange = (e)=>{
        const {name, value, type, files} = e.target;
        // fetch all childs cat after cat select
        if(name === 'cat_id'){
            let currentChild = allChilds.filter((o) => (o.parent_id === value));
           setAllChilds(currentChild);
        }
        // file manage
        if (type === "file") {
            let fileToUpload = [];
            Object.keys(files).map((key) => {
              fileToUpload.push(files[key]);
            });
            setImageFileUpload(fileToUpload);
           // console.log('Image File Upload', imageFileUpload);
          } else {
            setProductData({ ...productData, [name]: value });
           // console.log('Product Data', productData);
          }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Product name is required!";
        }
        if (!values.price) {
            errors.price = " Product price is required!";
        }
        if (!values.description) {
            errors.description = " Product description is required!";
        }
        if (!values.cat_id) {
            errors.cat_id = " Product category is required!";
        }
        if (!values.image) {
            errors.image = " Product name is required!";
        }

        return errors;
    };

    const uploadProduct = () => {
        const http = new HttpClient();
        http
          .uploader(productData, imageFileUpload, "POST", "product", true)
          .then((response) => {
           // console.log("Response", response);
             if (response.data.status) {
              toast.success('Product added successfully.');
              navigate("/admin/product");
             }
            setIsLoading(false);
          })
          .catch((error) => {
            toast.error(error);
          });
      };



    const handleSubmit = (ev)=>{
        ev.preventDefault();
        setProductDataErr(validate(productData));
        console.log("Data", productData);
        console.log("Image", imageFileUpload);
        uploadProduct();
    }


    return(
        <>
            <div className="container-fluid">
                    <div className="row">
                    <div className="col-12">
                        <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="" className="col-3">Product Title</label>
                            <div className="col-9">
                                <input type="text"   name="name" onChange={handleChange} className="form-control form-control-sm"  placeholder="Enter Product Name"></input>
                                <span className="text-danger">{productData.name}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-3">Category</label>
                            <div className="col-9" >
                                <select  name="cat_id" onChange={handleChange}  id="cat_id"
                                className=" form-control form-control-sm">
                                    <option selected disabled> -- Select Parent category --</option>
                                    {
                                        allParents.map((o,i)=>(
                                            <option key={i} value={o._id}>
                                                {o.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-3">Child Category</label>
                            <div className="col-9" >
                                <select  name="child_cat_id" onChange={handleChange}  id="child_cat_id"
                                className=" form-control form-control-sm">
                                    <option selected disabled> -- Select Child category --</option>
                                    {
                                        allChilds.map((o,i)=>(
                                        <option key={i} value={o._id}>
                                            {o.name}
                                        </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-3">Description</label>
                            <div className="col-9" >
                                <textarea  className="form-control form-control-sm" onChange={handleChange} name="description" rows="6" ></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-3">Price</label>
                            <div className="col-9" >
                                <input type="number"   min="1" onChange={handleChange} className="form-control form-control-sm" name="price" placeholder="Enter Price"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-3">Discount %</label>
                            <div className="col-9" >
                                <input type="number"  onChange={handleChange}  className="form-control form-control-sm" name="discount" placeholder="Enter Discount"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-3">Is Featured</label>
                            <div className="col-9" >
                                <input type="checkbox" onChange={handleChange}  name="is_featured" value={1}></input> &ensp; Yes
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-3">Status</label>
                            <div className="col-9" >
                                <select  name="status"  onChange={handleChange}  id="status"
                                className=" form-control form-control-sm">
                                    <option selected disabled> -- Select --</option>
                                    <option value="Active"> Active </option>
                                    <option value="Inactive"> Inactive </option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-3">Images</label>
                            <div className="col-9" >
                                <input type="file" onChange={handleChange}  name="image"></input> 
                            </div>
                        </div>

                        <div className="form-group row">
                            {/* {
                                    image && image.map((o,i) => (
                                    <div key={i} className="col-3">
                                        <img src={process.env.REACT_APP_IMAGE_URL + o} className="img img-fluid"></img>
                                        <button type="button" className="btn btn-sm btn-danger btn-circle"  onClick={() =>{
                                            return this.deleteImageFromDB(i);
                                        }}>
                                            <FaTrash></FaTrash>
                                        </button>
                                    </div>
                                ))
                            } */}
                        </div>
                        <div className="form-group row mb-3">
                            <div className="offset-3 col-9 ">
                                <button className="btn btn-sm btn-success" type="submit">
                                    <FaPaperPlane></FaPaperPlane> &ensp;  Add Product
                                </button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}