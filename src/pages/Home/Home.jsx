/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useContext } from 'react';

// swiper slider
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {EffectCoverflow, Pagination, Navigation} from 'swiper/modules';

// slider images
import Dal from '../../assets/images/swiper-slider/dal.webp'
import jaggery from '../../assets/images/swiper-slider/jaggery.jpg'
import chana from '../../assets/images/swiper-slider/chana.webp'
import jaggery2 from '../../assets/images/swiper-slider/jaggery2.webp'
import moong from '../../assets/images/swiper-slider/moong.webp'
import moong2 from '../../assets/images/swiper-slider/moong2.webp'
import moong3 from '../../assets/images/swiper-slider/moong3.webp'
import soil from '../../assets/images/swiper-slider/soil.webp'
import rice from '../../assets/images/swiper-slider/rice.webp'

import SliderBanner from './slider/Slider';
import CatSlider from '../../components/catSlider/CatSlider';

import Banners from '../../components/banners/Banners';

import './style.css';
import Product from '../../components/product/Product';
import banner5 from '../../assets/images/banner5.png';

import Slider from "react-slick";
import TopProducts from './TopProducts/TopProducts';
import axios from 'axios';
import { MyContext } from '../../App';
import CatSlider1 from '../../components/catSlider/CatSlider1';


// import { useGetAllProductsQuery } from '../../redux/apis/ProductApi';

const Home = (props) => {


    const [prodData, setprodData] = useState(props.data)
    const [catArray, setcatArray] = useState([])
    const [activeTab, setactiveTab] = useState();
    const [activeTabIndex, setactiveTabIndex] = useState(0);
    const [activeTabData, setActiveTabData] = useState([]);

    const [bestSells, setBestSells] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const productRow=useRef();
    const context = useContext(MyContext);


// const {data} = useGetAllProductsQuery()
// console.log("data",data);

    var settings = {
        dots: true,
        infinite: context.windowWidth<992 ? false : true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        autoPlay: true,
        arrows: context.windowWidth<992 ? false : true,
    };
    var settings1 = {
        dots: true,
        infinite: context.windowWidth<992 ? false : true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        autoPlay: true,
        arrows: context.windowWidth<992 ? false : true,
    };

    const catArr = [];

    useEffect(() => {

        prodData.length !== 0 &&
            prodData.map((item) => {
                item.items.length !== 0 &&
                    item.items.map((item_) => {
                        catArr.push(item_.cat_name);
                    })
            })

        const list2 = catArr.filter((item, index) => catArr.indexOf(item) === index);
        setcatArray(list2)

        setactiveTab(list2[0])

        window.scrollTo(0,0);

    }, [])





    useEffect(() => {
        const arr = [];
        setActiveTabData(arr);
        prodData.length !== 0 &&
            prodData.map((item, index) => {
                item.items.map((item_, index_) => {
                    if (item_.cat_name === activeTab) {
                        {
                            item_.products.length !== 0 &&
                                item_.products.map((product) => {
                                    arr.push({ ...product, parentCatName: item.cat_name, subCatName: item_.cat_name })
                                })

                            setActiveTabData(arr)
                            // setTimeout(()=>{
                            //     setIsLoadingProducts(false);
                            // },[1000]);
                        }
                    }
                })

            })

    }, [activeTab, activeTabData])


    const bestSellsArr = [];

    useEffect(() => {
        prodData.length !== 0 &&
            prodData.map((item) => {
                if (item.cat_name === "Electronics") {
                    item.items.length !== 0 &&
                        item.items.map((item_) => {
                            item_.products.length !== 0 &&
                                item_.products.map((product, index) => {
                                    bestSellsArr.push(product);
                                })
                        })
                }

            });


        setBestSells(bestSellsArr);

    }, [])




    return (<>
        <div style={{display:'block'}}>
            <SliderBanner />
            {
                    context.windowWidth > 992  ? <CatSlider1 data={prodData}/>  : ""
                }
            
            {/* <CatSlider data={prodData} /> */}

            <Banners />

{/* popular products  with tabs*/}
            <section className='homeProducts homeProductWrapper'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center homeProductsTitleWrap '>
                        <h2 className='hd mb-0 mt-0 res-full'>Popular Products</h2>
                        <ul className='list list-inline ml-auto filterTab mb-0 res-full'>
                            {
                                catArray.length !== 0 &&
                                catArray.map((cat, index) => {
                                    return (
                                        <li key={cat.id} className="list list-inline-item">
                                            <a className={`cursor text-capitalize 
                                                ${activeTabIndex === index ? 'act' : ''}`}
                                                onClick={() => {
                                                    setactiveTab(cat)
                                                    setactiveTabIndex(index);
                                                    productRow.current.scrollLeft=0;
                                                    setIsLoadingProducts(true);
                                                }}
                                            >
                                                {cat}
                                            </a>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>


                    <div className={`productRow offset-md-1 ${isLoadingProducts===true && 'loading'}`} ref={productRow}>

                        {
                            activeTabData.length !== 0 &&
                            activeTabData.map((item, index) => {
                                return (
                                    <div className='item' key={index}>

                                        <Product tag={item.type} item={item} />
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
            </section>

          


            


{/* daily products */}
            <section className='homeProducts homeProductsRow2 pt-0'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center'>
                        <h2 className='hd mb-0 mt-0'>Daily Best Sells</h2>
<ul className='list list-inline-item ml-auto filterTab mb-0'>
    <li className='list-inline-item'>
        <a className='cursor'>Featured</a>
    </li>
    <li className='list-inline-item'>
        <a className='cursor'>Popular</a>
    </li>
    <li className='list-inline-item'>
        <a className='cursor'>New Added</a>
    </li>
</ul>

                    </div>

                    <br className='res-hide' /><br  className='res-hide'/>
                    <div className='row'>
                        <div className='col-md-3 pr-5 res-hide'>
                            <img src={banner5} className='w-100' style={{borderRadius:'20px'}} />
                        </div>

                        <div className='col-md-9'>
                            <Slider {...settings} className='prodSlider'>
                            {
                            activeTabData.length !== 0 &&
                            activeTabData.map((item, index) => {
                                return (
                                    <div className='item' key={index}>

                                        <Product tag={item.type} item={item} />
                                    </div>
                                )
                            })
                        }
                            {/* {
                                   bestSells&&
                                    bestSells.map((item, index) => {
                                        return (
                                            <div  className='item' key={item.id}>
                                                <Product tag={item.type} item={item} />
                                            </div>
                                        )
                                    })
                                } */}

                                            {/* <div className='item' >
                                                <Product  tag='sale' />
                                            </div>
                                            <div className='item' >
                                                 <Product tag='best' />
                                            </div>
                                            <div className='item' >
                                                <Product tag='hot' />
                                            </div>
                                            <div className='item' >
                                                <Product tag='new' />
                                            </div>
                                            <div className='item' >
                                                <Product tag='sale' />
                                            </div>
                                            <div className='item' >
                                                <Product tag='sale' />
                                            </div> */}

                            </Slider>
                        </div>
                    </div>


                </div>
            </section>


{/* 3d slider */}
{/* <section>
<div className="container-swiper">
    <h1 className='heading'>3d SLider</h1>
    <Swiper 
    effect={'coverflow'}
    grabCursor={true}
    centeredSlides={true}
    loop={true}
    slidesPerView={'auto'}
    coverflowEffect={{
        rotate :'0',
        stretch :'0',
        depth:'100',
        modifier :2.5,

    }}
    Pagination ={{el:'.swiper-pagination' ,clickable: true}}
    navigation={{
        nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        clickable: true,
    }}
    modules={[EffectCoverflow, Pagination,Navigation]}
    className="swiper_container"
    >
        <SwiperSlide>
            <img src={Dal} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={jaggery} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={jaggery2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={moong} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={moong2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={moong3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={rice} alt="" />
        </SwiperSlide>

        <div className="slider_container">
            <div className="swiper-button-prev slider-arrow">
<ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next  slider-arrow">
<ion-icon name="arrow-forward-outline"></ion-icon>
            </div>

            <div className="swiper-pagination"></div>
        </div>
    </Swiper>
</div>
</section> */}
{/* top products */}
            <section className='topProductsSection'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className=' col-sm-6 col-md-3'>
                            <TopProducts title="Vegetables" />
                        </div>

                        <div className=' col-sm-6 col-md-3' >
                            <TopProducts title="Vegetables" />
                        </div>

                        <div className=' col-sm-6 col-md-3' >
                            <TopProducts title="Vegetables" />
                        </div>

                        <div className=' col-sm-6 col-md-3'>
                            <TopProducts title="Vegetables" />
                        </div>

                    </div>
                </div>
            </section>


        </div>

 
        
    </>)
}

export default Home;






