import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HttpClient } from '../../../utility/httpclient';
import { toast } from 'react-toastify';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';

export function CategoryEdit(){

    const commonFields = {
        name: '',
        parent_id: ''
    };

    const [categoryData, setCategoryData] = useState(commonFields);
    const [categoryDataErr, setCategoryDataErr] = useState(commonFields);

    const [allCats, setAllCats] = useState([]);

    const [imageFileUpload, setImageFileUpload] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const param = useParams();

    useEffect(()=>{
        const http = new HttpClient();
        http.getItemById('category/'+ param.id,true)
        .then((response)=>{
            //console.log('Response',response);
            if(response.data.status){
                setCategoryData(response.data.data);
                setIsLoading(false);
            }  
        })
        .catch((error)=>{
            console.log('Error',error);
        })
    }, [isLoading]);
    
    useEffect(() => {
        const http = new HttpClient();
        http.getItem('category',{
            headers:{
                'authorization': localStorage.getItem('token')
            }
        })
        .then((response)=>{
            if(!response.data.data){
                toast.success('No Category Found.');
            }
            let parent_cats = response.data.data.filter((obj)=>(obj.parent_id === null));
            setAllCats(parent_cats);
        })
        .catch((error)=>{
            console.log('All Cats Error', error);
        })
    }, []);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
          let fileToUpload = [];
          Object.keys(files).map((key) => {
            fileToUpload.push(files[key]);
          });
          setImageFileUpload(fileToUpload);
         
        } else {
          setCategoryData({ ...categoryData, [name]: value });
         
        }
        
      };

    const updateCategory = (data,files) => {
        const {category} = categoryData;
        for(let key in data){
            if(data[key]){
                category[key] = data[key];
            }
        }

        const http = new HttpClient();
        http.uploader(categoryData,imageFileUpload, 'PUT','category/'+categoryData._id, true)
        .then((resolve)=>{
            toast.success(resolve.msg)
            navigate('/admin/category')
        })
        .catch((error)=>{
            //
        })  
    
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Category name is required!";
        }
        if (!values.image) {
          errors.image = "Image must be of type: jpg, jpeg, png, gif, svg!";
        }
        return errors;
      }; 

    const handleSubmit = (ev) =>{
        ev.preventDefault();

        setCategoryDataErr(validate(categoryData));
        updateCategory();
    }

    const deleteImageFromDB = ()=>{
        let images = '';
        setCategoryData((prev) => {
          return { ...prev, image: images };
        });
    }


    return (
        <>
            <h4> Category Update Form</h4>
            <hr></hr>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Title</label>
                                <div className="col-9">
                                    <input type="text" name="name"  defaultValue = { categoryData.name} onChange={handleChange} className="form-control form-control-sm"></input>
                                    <span className="text-danger">{categoryDataErr.name}</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Child Of</label>
                                <div className="col-9" >
                                   <select  name="parent_id" id="parent_id" defaultValue = { categoryData.parent_id} onChange={handleChange} className=" form-control form-control-sm">
                                        <option> -- Select Parent category --</option>
                                        {
                                            allCats.map((obj,index)=>(
                                                <option key={index} value={obj._id}>
                                                    {obj.name}
                                                </option>
                                            ))
                                        }
                                   </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Image</label>
                                <div className="col-9">
                                    <input type="file" onChange={handleChange} name="image" alt=""  />
                                </div>
                            </div>

                             <div className="form-group row">
                                {
                                    categoryData &&
                                        categoryData.image &&
                                        (
                                            <div className="col-3">
                                                <img src={process.env.REACT_APP_IMAGE_URL + categoryData.image} className="img img-fluid"></img>
                                                <button type="button" className="btn btn-sm btn-danger btn-circle"  onClick={() =>{
                                                    return deleteImageFromDB(categoryData.image);
                                                }}>
                                                    <FaTrash></FaTrash>
                                                </button>
                                            </div>
                                        )
                                }
                               
                            </div> 
                            
                            <div className="form-group row mb-3">
                                <div className="offset-3 col-9 ">
                                    <button className="btn btn-sm btn-success" type="submit">
                                        <FaPaperPlane></FaPaperPlane> &ensp; Update Category
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