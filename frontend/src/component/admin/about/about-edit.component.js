import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HttpClient } from '../../../utility/httpclient';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';
import {toast} from 'react-toastify';

export function AdminAboutEdit(){

    const commonFields = {
        name:'',
        description: '',
    };

    const [aboutValue, setAboutValue] = useState(commonFields);
    const [aboutValueErr, setAboutValueErr] = useState(commonFields);

    const [imageFileUpload, setImageFileUpload] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const http = new HttpClient();
        http.getItemById('about/'+ params.id, true)
        .then((response)=>{
           // console.log('Data',response);
            if(response.data.status){
                setAboutValue(response.data.data);
            }
        })
        .catch((error)=>{
            toast.error('Error',error);
        });
       
    }, []);

    const handleChange = (event) =>{
        const { name, value, type, files } = event.target;
        if (type === "file") {
          let fileToUpload = [];
          Object.keys(files).map((key) => {
            fileToUpload.push(files[key]);
          });
          setImageFileUpload(fileToUpload);
         // console.log('Image File Upload', imageFileUpload);
        } else {
          setAboutValue({ ...aboutValue, [name]: value });
         // console.log('Slider Data', sliderData);
        }

    }

    const updateAbout = (data, files) =>{
        const {about} = aboutValue;
        for(let key in data){
            if(data[key]){
                about[key] = data[key];
            }
        }

        const http = new HttpClient();
        http.uploader(aboutValue,imageFileUpload, 'PUT','about/'+aboutValue._id, true)
        .then((resolve) =>{
            toast.success(resolve.msg)
            navigate('/admin/about')
        })
        .catch((error)=>{
            console.log("Error ", error);
        })
    }

    const validate = (values) =>{
        const errors = {};
        if (!values.name) {
          errors.name = "Name field is required!";
        }
        if (!values.description) {
            errors.name = "Description is required!";
          }
        if (!values.image) {
          errors.image = " Image must be of type: jpg, jpeg, png, gif, svg!";
        }
    
        return errors;
    };

    const deleteImageFromDB = () => {
        let images = '';
        setAboutValue((prev) => {
          return { ...prev, image: images };
        });
      };

    const handleSubmit = (ev) =>{
        ev.preventDefault();

        setAboutValueErr(validate(aboutValue));
        updateAbout();
    }


    return(
        <>
             <h4> About Update Form</h4>
            <hr></hr>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Title</label>
                                <div className="col-9">
                                    <input type="text" name="name"  value={ aboutValue.name} onChange={handleChange} className="form-control form-control-sm"></input>
                                    <span className="text-danger">{aboutValueErr.name}</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Description</label>
                                <div className="col-9">
                                    <textarea type="text" name="description"  value={ aboutValue.description} onChange={handleChange} className="form-control form-control-sm" rows="7"></textarea>
                                    <span className="text-danger">{aboutValueErr.description}</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Image</label>
                                <div className="col-9">
                                    <input type="file" onChange={handleChange} name="image"  />
                                </div>
                            </div>
                            <div className="form-group row">
                                {
                                     aboutValue &&
                                        aboutValue.image &&
                                            (
                                        <div className="col-3">
                                            <img src={process.env.REACT_APP_IMAGE_URL + aboutValue.image} className="img img-fluid"></img>
                                            <button type="button" className="btn btn-sm btn-danger btn-circle"  onClick={() =>{
                                                return deleteImageFromDB(aboutValue.image);
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
                                        <FaPaperPlane></FaPaperPlane> &ensp; Update About
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