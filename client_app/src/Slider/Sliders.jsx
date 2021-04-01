import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Slider from "react-slick";
// import { Link } from 

function Sliders(props) {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
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
    const [product, set_product] = useState([])

    useEffect(() => {

        fetch('http://localhost:5000/api/product', {

            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                set_product(data)
            })
            .catch(err => console.error(err));
    }, [])

    return (

        <div>
            <Link to='/test'>fdsd</Link>
            <Slider {...settings}>
                {
                    product && product.map(value => (
                        <div className="col-lg-12">
                            {/* single-product-wrap start */}
                            <div className="single-product-wrap">
                                <div className="product-image">
                                    <a href="single-product.html">
                                        <img src={"http://localhost:5000/" + value.img} alt="Li's Product Image" />
                                    </a>
                                    <span className="sticker">New 1</span>
                                </div>
                            </div>
                            {/* single-product-wrap end */}
                        </div>


                    ))
                }
            </Slider>

        </div>
    );
}

export default Sliders;