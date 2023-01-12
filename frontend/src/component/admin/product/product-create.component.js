import React from 'react';
import { ProductForm } from './product-form.component';
import { HttpClient } from '../../../utility/httpclient';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function ProductCreate(){

    const navigate = useNavigate();

    const add = (data) =>{
        const http = new HttpClient();
        http.postItem(`product`,data,{
            "content-type": "application/json",
            "headers":{
                "authorization": localStorage.getItem('token')
            }
        })
        .then((response)=>{
            if(response.data.status){
                toast.success(response.data.msg);
                navigate('/admin/product');
            }
        })
        .catch((error)=>{
            console.log('Error ', error);
        })
    }

    return(
        <ProductForm onHandleSubmit = {add} dataId={null}></ProductForm>
    );
}