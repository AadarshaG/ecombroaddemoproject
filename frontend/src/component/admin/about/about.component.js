import React, { useEffect, useState } from 'react';
import { HttpClient } from '../../../utility/httpclient';
import { NavLink } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';

export function AdminAbout(){

    const [allAbout, setAllAbout] = useState([]);

    useEffect(()=>{
        const http = new HttpClient();

        http.getItem('about',{
            headers:{
                'authorization': localStorage.getItem('token')
            }
        })
        .then((response)=>{
            if(!response.data.status){
                toast.error('No About Us found.');
            }
            setAllAbout(response.data.data);
        })
        .catch((error)=>{
            console.log('Error',error);
        })
    }, []);

    return(
        <>
             <div className="card-box mb-30">
                <div className="pd-20">
                    <h4 className="text-blue h4">About Us
                        
                    </h4>             
                </div>
                <div className="pb-20">
                <table className='table table-sm table-hover table-border'>
                        <thead className='table-dark'>
                        <tr>
                            <th>S.N</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr> 
                        </thead>
                        <tbody>
                            { allAbout.map((object,index)=> (
                            
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{object.name}</td>
                                    <td>
                                        <img src={process.env.REACT_APP_IMAGE_URL + '/' + object.image} key={index} alt="" height={40}></img>
                                    </td>
                                    <td>
                                        <NavLink to={'/admin/about/' + object._id} className="btn btn-sm btn-primary btn-circle" >
                                            <FaPen></FaPen>
                                        </NavLink>
                                        
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