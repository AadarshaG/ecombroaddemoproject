import React, { useEffect, useState } from "react";
import { HttpClient} from '../../../utility/httpclient';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function HomeSlider(){

    const [allSlider, setAllSLider] = useState([]);
    
    useEffect(()=>{
        const http = new HttpClient();
        http.getItem(`slider`,{
            headers:{
                'authorization': localStorage.getItem('token')
            }
        })
        .then((response) => {
            if(response.data.status)
            {
                setAllSLider(response.data.data);
            }
        })
        .catch((error) => {
            //
        })
    });
     const sliderHome = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      cssEase: "linear",
    };
    return(
       <>
            <section id="homeSliderSection">
                <div className="owl-carousel owl-theme" id="homeSlider">
                <Slider {...sliderHome}>
                    {allSlider.map((o, index) => (
                    <div className="item" key={index}>
                        <img src={process.env.REACT_APP_IMAGE_URL + '/' + o['image']} alt='' />
                    </div>
                    ))}
                </Slider>
                </div>
            </section>
       </>
    
    )
}