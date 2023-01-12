import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HttpClient } from '../../../utility/httpclient';
import { FaTrash, FaPaperPlane } from 'react-icons/fa';

export function AdminSliderEdit(){

    const commonFields = {
        name: ''
    };

    const [sliderData, setSliderData] = useState(commonFields);
    const [sliderDataErr, setSliderDataErr] = useState(commonFields);

    const [imageFileUpload, setImageFileUpload] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
       
        const http = new HttpClient();
        http.getItemById('slider/'+ params.id, true)
        .then((response)=>{
           // console.log('Data',response);
            if(response.data.status){
                setSliderData(response.data.data);
            }
        })
        .catch((error)=>{
            toast.error('Error',error);
        });
    }, [isLoading]);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
          let fileToUpload = [];
          Object.keys(files).map((key) => {
            fileToUpload.push(files[key]);
          });
          setImageFileUpload(fileToUpload);
         // console.log('Image File Upload', imageFileUpload);
        } else {
          setSliderData({ ...sliderData, [name]: value });
         // console.log('Slider Data', sliderData);
        }

        // prestate handle
        
      };

    const updateSlider = (data, files) => {
        const {slider} = sliderData;
        for(let key in data){
            if(data[key]){
                slider[key] = data[key];
            }
        }

        // // product image update ko case
        // let submit_data = {};
        //  Object.keys(slider).map((key) => {
        //     // if(key !== 'images' || key !== '_id' || key !== '__v'){
        //     //     submit_data[key] = slider[key];
        //     // }
        //     if(key === 'images'){
        //         submit_data['old_image'] = slider['image'];
        //     }
        // });

        const http = new HttpClient();
        http.uploader(sliderData,imageFileUpload, 'PUT','slider/'+ sliderData._id, true)
        .then((resolve) =>{
            toast.success(resolve.msg)
            navigate('/admin/slider')
        })
        .catch((error)=>{
            console.log("Error ", error);
        })
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Slider name is required!";
        }
        if (!values.image) {
          errors.image = "Image must be of type: jpg, jpeg, png, gif, svg!";
        }
    
        return errors;
      };

      const deleteImageFromDB = () => {
        let images = '';
        setSliderData((prev) => {
          return { ...prev, image: images };
        });
      };

    const handleSubmit = (ev)=>{
        ev.preventDefault();

        setSliderDataErr(validate(sliderData));
        updateSlider();
        // if (Object.keys(sliderDataErr).length === 0) {
        //     updateSlider();
        //   } else {
        //     console.log(
        //       "Not Ready To update because ",
        //       "slider error=",
        //       Object.keys(sliderDataErr).length
        //     );
        //     console.log(sliderDataErr);
        //   }
    };
    return(
        <>
             <h4> Slider Update Form</h4>
            <hr></hr>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Title</label>
                                <div className="col-9">
                                    <input type="text" name="name"  value={ sliderData.name} onChange={handleChange} className="form-control form-control-sm"></input>
                                    <span className="text-danger">{sliderDataErr.name}</span>
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
                                     sliderData &&
                                            sliderData.image &&
                                            (
                                        <div className="col-3">
                                            <img src={process.env.REACT_APP_IMAGE_URL + sliderData.image} className="img img-fluid"></img>
                                            <button type="button" className="btn btn-sm btn-danger btn-circle"  onClick={() =>{
                                                return deleteImageFromDB(sliderData.image);
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
                                        <FaPaperPlane></FaPaperPlane> &ensp; Update Slider
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