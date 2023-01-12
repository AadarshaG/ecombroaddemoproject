// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { HttpClient } from '../../../utility/httpclient';
// import {toast} from 'react-toastify';
// import { useEffect, useState } from 'react';
// import { FaPaperPlane } from 'react-icons/fa';

// export function CategoryCreate(){

//     const commonFields = {
//         name: '',
//         parent_id: '',
//     };

//     const [catValue, setCatValue] = useState(commonFields);
//     const [catValueError, setCatValueError] = useState(commonFields);
//     const [isLoading, setIsLoading] = useState(true);
    
//     const [allCats, setAllCats] = useState([]);
//     const [parentId, setParentIdError] = useState(null);
//     const http = new HttpClient();
//     const navigate = useNavigate();


//     return (
//         <>
//         <h4> Category Form</h4>
//         <hr></hr>
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-12">
//                     <form className="form">
//                         <div className="form-group row">
//                             <label htmlFor="" className="col-3">Title</label>
//                             <div className="col-9">
//                                 <input type="text" name="title"  className="form-control form-control-sm"  placeholder="Enter Category Name"></input>
//                                 <span className="text-danger">{catValueError.name}</span>
//                             </div>
//                         </div>
//                         <div className="form-group row">
//                             <label htmlFor="" className="col-3">Child Of</label>
//                             <div className="col-9" >
//                                 <select  name="parent_id" id="parent_id"
                                
//                             className=" form-control form-control-sm">
//                                     <option selected disabled> -- Select Parent category --</option>
//                                     {
//                                         allCats.map((obj,index)=>(
//                                             <option key={index} value={obj._id}>
//                                                 {obj.name}
//                                             </option>
//                                         ))
//                                     }
//                                 </select>
//                             </div>
//                         </div>
//                         <div id="childCats"></div>
//                         <div className="form-group row mb-3">
//                             <div className="offset-3 col-9 ">
//                                 <button className="btn btn-sm btn-success" type="submit" onSubmit={handleSubmit}>
//                                     <FaPaperPlane></FaPaperPlane> &ensp; Add Category
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// }