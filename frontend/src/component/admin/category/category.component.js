import React, { useEffect, useState } from 'react';
import { HttpClient } from '../../../utility/httpclient';
import { toast } from 'react-toastify';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css'; 
import { NavLink } from 'react-router-dom';
import './category.component.css';

export function Category(){

    let [allCats, setAllCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const http = new HttpClient();
        http.getItem(`category`,{
            headers:{
                'authorization': localStorage.getItem('token')
            }
        })
        .then((response) => {
            if(!response.data.data)
            {
                toast.error('Category not found.');
            }
            setAllCats(response.data.data);
            setIsLoading(false);

        })
        .catch((error) => {
            //
        })
    }, [isLoading])

    const deleteItem = (index,id) => {
        const http = new HttpClient();
        http.deleteItem('category/'+id, true)
        .then((response) => {
            //console.log('Response', response);
            if(response.data.status === true){
                toast.success(response.data.msg);

                //only for admin who perform this delete action
                allCats = allCats.filter((ob, i) => (i !== index));
                setAllCats(allCats);
                setIsLoading(true);

                //to delete for other logged_in admin also copy paste below code and comment above code
                    // http.getItem(`category`,{
                    //     headers:{
                    //         'authorization': localStorage.getItem('token')
                    //     }
                    // })
                    // .then((response) => {
                    //     if(!response.data.data)
                    //     {
                    //         toast.error('Category not found.');
                    //     }
                    //     setAllCats(response.data.data);
                    //     setIsLoading(false);
            
                    // })
                    // .catch((error) => {
                    //     //
                    // })
            }else{
                toast.error(response.data.msg);
            }
        })
        .catch((error) =>{
            console.log('Error', error);
        })
    }

    return(
        <>
            <div className="card-box mb-30">
                <div className="pd-20">
                    <h4 className="text-blue h4">Category Lists
                        <NavLink to="/admin/category/create" className={()=>'float-end btn btn-sm btn-success'}>
                            <FaPlus></FaPlus> &ensp; Add Category
                        </NavLink> 
                    </h4>             
                </div>
                <div className="pb-20">
                <table className='table table-sm table-hover table-border'>
                        <thead className='table-dark'>
                        <tr>
                            <th>S.N</th>
                            <th>Title</th>
                            <th>Is Parent</th>
                            <th>Action</th>
                        </tr> 
                        </thead>
                        <tbody>
                            { allCats.map((object,index)=> (
                            
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{object.name}</td>
                                    <td>{object.is_parent ? 'Yes' : 'No'}</td>
                                    <td>
                                        <NavLink to={'/admin/category/edit/' + object._id} className="btn btn-sm btn-primary btn-circle" >
                                            <FaPen></FaPen>
                                        </NavLink>

                                        &ensp;
                                        <button className="btn btn-sm btn-danger btn-circle" value={object._id} onClick={(ev)=>{
                                            
                                            Swal.fire({
                                                title: 'Are you sure?',
                                                text: "You won't be able to revert this!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Yes, delete it!'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    return deleteItem(index,object._id)
                                                }
                                            })
                                        }}>
                                            <FaTrash></FaTrash>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}