import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {toast} from 'react-toastify';
import {HttpClient} from '../../../utility/httpclient';
import { NavLink } from 'react-router-dom';

export function Category(){

    const [allCategory, setAllCategory] = useState([]);

    useEffect(()=>{
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
            let parent_cats = response.data.data.filter((obj)=>(obj.parent_id === null));
            // console.log('Parent Cats', parent_cats);
            setAllCategory(parent_cats);
        })
        .catch((error) => {
            //
        })
    })

    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return(
       
        <>
            <section id="shopByCategory" className="section-padd">
                <div className="container">
                    <div className="section-title">
                        Shop By Category
                    </div>
                    <div className="owl-carousel owl-theme" id="homeCategorySlider">
                       <Slider {...settings}>
                          {allCategory.map((o,i)=>(
                            <div className="item" key={i}>
                                <div className="category-block">
                                    <NavLink to={'category/'+ o._id}>
                                        <div className="category-block-img-wrap">
                                            <img className="category-block-img" src={process.env.REACT_APP_IMAGE_URL + '/' + o['image']} alt="" />
                                        </div>
                                        <div className="category-block-title">
                                            {o.name}
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                          ))}
                       </Slider>
                    </div>
                </div>
            </section>
        </>
    )
}