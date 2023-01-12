import React, { useState } from 'react';
import { HomeSlider } from './slider/slider.component';
import {Category} from './category/category.component';
import { Featured } from './featured/featured.component';
import { Latest} from './latest/latest.component';

export function HomeComponent(){
    return(
        <>

             <HomeSlider></HomeSlider>
            <Category></Category>
            <Featured></Featured>
            <Latest></Latest> 
            
        </>
    )
}