import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HttpClient } from "../../../utility/httpclient";
import { FaPaperPlane } from "react-icons/fa";

export function AdminSliderForm() {
  const commonFields = {
    name: ""
  };

  const [sliderData, setSliderData] = useState(commonFields);
  const [sliderValueErr, setSliderValueErr] = useState(commonFields);
  //to show preview of upload image
  const [imageFileUpload, setImageFileUpload] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {}, [isLoading]);

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
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Slider name is required!";
    }
    if (!values.image) {
      errors.image = "Slider Image must be of type: jpg, jpeg, png, gif, svg!";
    }

    return errors;
  };

  const uploadData = () => {
    const http = new HttpClient();
    http
      .uploader(sliderData, imageFileUpload, "POST", "slider", true)
      .then((response) => {
         if (response.data.status) {
          toast.success(response.data.msg);
          navigate("/admin/slider");
         }
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSliderValueErr(validate(sliderData));
    console.log("Data", sliderData);
    uploadData();
    // if (Object.keys(sliderValueErr).length === 0) {
    //   uploadData();
    // } else {
    //   console.log(
    //     "Not Ready To UPload because ",
    //     "slider error=",
    //     Object.keys(sliderValueErr).length
    //   );
    // }
  };

  return (
    <>
      <h4> Add Slider</h4>
      <hr></hr>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <form className="form">
              <div className="form-group row">
                <label htmlFor="" className="col-3">
                  Title
                </label>
                <div className="col-9">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="form-control form-control-sm"
                    required
                    placeholder="Enter Slider Name"
                  ></input>
                  <span className="text-danger">{sliderValueErr.name}</span>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-3">
                  Image
                </label>
                <div className="col-9">
                  <input type="file" onChange={handleChange} name="image" />
                  <span className="text-danger">{sliderValueErr.image}</span>
                </div>
              </div>
              {/* <div className="form-group row">
                    <div className="col-3">
                        <img src={URL.createObjectURL(imageFileUpload)} alt=""></img>
                    </div>
                </div> */}

              <div className="form-group row mb-3">
                <div className="offset-3 col-9 ">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    <FaPaperPlane></FaPaperPlane> &ensp; Add Slider
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
