import React, { useEffect, useState } from 'react';
import { HttpClient } from '../../../utility/httpclient';
import { toast } from 'react-toastify';
import { FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function CategoryForm(){

    const commonFields = {
        name: '',
        parent_id: ''
    };

    const [catValue,setCatValue] = useState(commonFields);
    const [catValueErr,setCatValueErr] = useState(commonFields);
    //const [parentId, setParentId] = useState(null);
    //to show preview of upload image
    const [imageFileUpload, setImageFileUpload] = useState([]);
    const [imageDisplay, setImageDisplay] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [allCats, setAllCats] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        const http = new HttpClient();
        http.getItem(`category`,{
            headers:{
                "authorization": localStorage.getItem('token')
            }
        })
        .then((response)=>{
           // console.log('Response',response);
            if(!response.data.data){
                toast.error("No Category Found.");
            }
            let parent_cats = response.data.data.filter((obj)=>(obj.parent_id === null));
           // console.log('Parent Cats', parent_cats);
            setAllCats(parent_cats);
            setIsLoading(false);
        })
    },[isLoading]);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
          let fileToUpload = [];
          Object.keys(files).map((key) => {
            fileToUpload.push(files[key]);
          });
          setImageFileUpload(fileToUpload);
          setImageDisplay(URL.createObjectURL(fileToUpload[0]));
         // console.log('Image File Upload', imageFileUpload);
        } else {
          setCatValue({ ...catValue, [name]: value });
         // console.log('Cat Data', catValue);
        }
       // console.log('Cat Data', catValue);
      };
    
      const validate = (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Category name is required!";
        }
        // if (!values.image) {
        //   errors.image = " Image must be of type: jpg, jpeg, png, gif, svg!";
        // }
        return errors;
      };
    
      const uploadData = () => {
        const http = new HttpClient();
        http.uploader(catValue, imageFileUpload, "POST", "category", true)
          .then((response) => {
            console.log("Upload data Response", response);
             if (response.data.status) {
              toast.success(response.data.msg);
              navigate("/admin/category");
             }
             setIsLoading(false);
          })
          .catch((error) => {
            toast.error(error);
          });
      };
    
      const handleSubmit = (ev) => {
        ev.preventDefault();
        setCatValueErr(validate(catValue));
        uploadData();
      };
    

    return(
        <>
            <h4> Category Form</h4>
            <hr></hr>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Title</label>
                                <div className="col-9">
                                    <input type="text" name="name" className="form-control form-control-sm" onChange={handleChange}  placeholder="Enter Category Name"></input>
                                    <span className="text-danger">{catValueErr.name}</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Child Of</label>
                                <div className="col-9" >
                                   <select  name="parent_id" id="parent_id" onChange={handleChange} className=" form-control form-control-sm">
                                        <option selected disabled> -- Select Parent category --</option>
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
                            <div id="childCats"></div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">
                                Image
                                </label>
                                <div className="col-9">
                                <input type="file" onChange={handleChange} name="image" alt=""/>
                                <span className="text-danger">{catValueErr.image}</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">
                                
                                </label>
                                <div className="col-4">
                                        <img src={imageDisplay} alt=""></img>
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <div className="offset-3 col-9 ">
                                    <button className="btn btn-sm btn-success" type="submit">
                                        <FaPaperPlane></FaPaperPlane> &ensp; Add Category
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