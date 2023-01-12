// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { HttpClient } from '../../../utility/httpclient';
// import { AdminSliderForm } from './slider-form.component';

// export function AdminSliderCreate(){

//     const http = new HttpClient();
//     const navigate = useNavigate();

//     const add = (data,files) => {
//         const xhr = new XMLHttpRequest();
//             const formData = new FormData();
//            // file append
//             for(let key in files){
//                 formData.append('image',files[key],files[key]['name'])
//             }
        
//             // formData.append('image',imageFileUpload);
//             //text data
//             for(let ind in data){
//                 formData.append(ind,data[ind])
//             }
//             xhr.onreadystatechange = () => {
//                 if(xhr.readyState === 4){
//                     let response;
//                     if(typeof(xhr.response) != 'object'){
//                         response = JSON.parse(xhr.response);
//                     }
//                     if(response.status === true){
//                         toast.success(response.msg);
//                         navigate('/admin/slider');
//                     }else{
//                         toast.error(response.msg);
//                     }
//                 }
//             }
            
//             xhr.open('POST',`${process.env.REACT_APP_BASE_URL}slider`);
            
//             xhr.setRequestHeader('authorization', localStorage.getItem('token'));
        
//             xhr.send(formData);
//         // const http = new HttpClient();
//         // http.uploader(data,files, 'POST','slider', true)
//         // .then((resolve) =>{
//         //     success(resolve.msg)
//         //     this.props.navigate('/admin/slider')
//         // })
//         // .catch((error)=>{
//         //     console.log("Error ", error);
//         // })
//     }


//     return(
//         <AdminSliderForm onHandleSubmit = {add} dataId={null} />
//     );
// }