import React, { useEffect, useState } from 'react';
import { HttpClient} from '../../../utility/httpclient';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function Featured(){

    const [allProducts, setAllProducts] = useState([]);

    useEffect(()=>{
        const http = new HttpClient();
        http.getItem('product',{
            headers:{
                "authorization": localStorage.getItem('token')
            }
        })
        .then((response)=>{
            if(response.data.status){
              setAllProducts(response.data.data);
            }   
        })
        .catch((error)=>{
            console.log('Error',error);
        })
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        cssEase: "linear",
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
          <section id="fashionNews" className="section-padd">
            <div className="container">
              <div className="section-title">
                Latest Products
              </div>
              <div className="row">
                  <Slider {...settings}> 
                    {
                        allProducts.map((o,i)=>(
                          <div className="col-md-4" key={i}>
                              <div className="news-card">
                                  <NavLink to={'/product/detail/'+ o._id}>
                                      <div className="news-card-img-wrap">
                                          <img className="news-card-img" src={process.env.REACT_APP_IMAGE_URL + '/' + o['image']} alt="" />
                                      </div>
                                      <div className="news-card-txt">
                                          <div className="news-card-date"></div>
                                          <div className="news-card-title">
                                              {o.name}
                                          </div>
                                          <div className="news-card-excerpt">
                                              {o.description}
                                          </div>
                                      </div>
                                  </NavLink>
                              </div>
                          </div>
                        ))
                      }
                  </Slider>	
              </div>
            </div>
				  </section>
        </>
    )
}