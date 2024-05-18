/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './catSlider1.css'
import Slider from 'react-slick'
import './style.css';
import { Link } from 'react-router-dom';
import featuredCategory1 from '../../assets/images/featuredCategory1.png'

import { MyContext } from '../../App';

const CatSlider1 = (props) => {

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        fade: false,
        arrows:true ,
        autoplay:true ,
    };

    const [allData, setAllData] = useState(props.data);
    const context = useContext(MyContext);

    const [itemBg, setItemBg] = useState([
        '#fffceb',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec'
    ]);



  return <>
  <div className="catSliderSection">
    <div className="container-fluid">
    <h2 className='hd'><b>Featured</b>  <b style={{color:'#f74b81'}}>Categories</b></h2>

    <Slider {...settings} className='cat_slider_Main' id="cat_slider_Main" >
 {
                               itemBg.length!==0 && itemBg.map((item,index)=>{
                                return(
                                    <div className='item' key={index.id}>
                                    <div className='info'  style={{background:item}}>
                                       <img className='info-img' src={featuredCategory1}/>
                                     <div className="img-text">
                                     <h5>Categories</h5>
                                        <p>26 items</p>
                                     </div>

                                      
                                    </div>
                                </div>
                                )
                               }) 
                        } 

    </Slider>
    </div>
  </div>
  </>
}   

export default CatSlider1