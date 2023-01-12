import React, { useEffect,useState } from 'react';
import { Navigate, NavLink} from 'react-router-dom';
import { HttpClient} from '../../../utility/httpclient';
import { toast} from 'react-toastify';
import { FaTrash, FaPen, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css'; 


export function Product(){

    let [all_products, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   

    useEffect(()=>{
        const http = new HttpClient();
        http.getItem(`product`,{
            headers:{
                'authorization': localStorage.getItem('token')
            }
        })
         .then((response)=>{
            // console.log('Response',response);
            if(!response.data.data)
            {
                toast.error('Product not found.');
            }
            setAllProducts(response.data.data);
            setIsLoading(false);
         })
         .catch((error)=>{
            //
         })
    }, [isLoading]);

    const deleteItem = (index,id) => {
        //console.log('Id',id);
        const http = new HttpClient();
        http.deleteItem('product/'+id, true)
        .then((response) =>{
            //console.log('Response', response);
            if(response.data.status){
                toast.success(response.data.msg);

                //only for admin who perform this delete action
                all_products = all_products.filter((ob, i) => (i !== index));
                setAllProducts(all_products);
                setIsLoading(true);

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
             <h4> All Products
                <NavLink to="/admin/product/create" className={()=> 'float-end btn btn-sm btn-success'}>
                    <FaPlus></FaPlus> &ensp; Add Product
                </NavLink>
            </h4>
            <hr></hr>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-sm table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.N</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { all_products.map((o,i) => (
                                <tr key={i}>
                                     <td>{i+1}</td>
                                     <td>{o.name}</td>
                                     <td>{o.cat_id.name}</td>
                                     <td>{o.price}</td>
                                     <td>{o.status}</td>
                                     <td>
                                     <NavLink to={'/admin/product/edit/' + o._id} className="btn btn-sm btn-primary btn-circle" >
                                            <FaPen></FaPen>
                                        </NavLink>
                                        &ensp;
                                        <button className="btn btn-sm btn-danger btn-circle" value={o._id} onClick={(ev)=>{
                                            
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
                                                    return deleteItem(i,o._id)
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
            </div>
        </>
    );
}