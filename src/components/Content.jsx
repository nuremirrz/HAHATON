import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { clientContext } from '../contexts/ClientContext';
import MediaCard from "./Card"
import Pagination from './Pagination';

const Content = () => {
    const { products, getProduct, currentPosts } = useContext(clientContext)
    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect(() => {
        getProduct()
    }, [])
    console.log(products);

    const [type, setType] = useState(null)
    console.log(type);

    useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    useEffect(() => {
        if (type === "Headwear") {
            let arr = products.filter(item => item.type === "Headwear")
            setFilteredProducts(arr)
        }
        else if (type === "Sweatshirt") {
            let arr = products.filter(item => item.type === "Sweatshirt")
            setFilteredProducts(arr)
        }
        else if (type === "Sweatpants") {
            let arr = products.filter(item => item.type === "Sweatpants")
            setFilteredProducts(arr)
        }
    }, [type])
    console.log(filteredProducts)

    return (
        <>
            <div>
                <div >

                    <img className="big--img" src="//cdn.shopify.com/s/files/1/0302/7829/files/Desktop_Inset_6_2780x.jpg?v=1631733522" alt="Snow" />

                    <div className="uniform">
                        <h2 >FW21 Uniform</h2>
                    </div>
                </div>
                <div >
                    <div class="title">
                        <div >
                            View the Collections
                        </div>
                        <h2>
                            Fall / Winter 2021
                        </h2>
                    </div>
                    <div class="carousel-wrapper">
                        <div data-slides-per-row="3">
                            <div class="swiper-wrapper" >

                                <div className="head-wears">
                                    <div class="head-wears-img">

                                        <img onClick={() => {
                                            setType("Headwear")
                                        }} className="img1" src="//cdn.shopify.com/s/files/1/0302/7829/files/1_e77dd7d6-e91f-4a05-9f47-449369b338ee_1600x.jpg?v=1631732274" alt="" />

                                    </div>
                                    <div>

                                        <h3 class="plp-product__title">Headwear</h3>
                                    </div>
                                </div>

                                <div className="sweat-shirts">
                                    <div class="sweat-shirts-img">
                                        <img onClick={() => {
                                            setType("Sweatshirt")
                                        }} className="img2" src="//cdn.shopify.com/s/files/1/0302/7829/files/3_4efad065-f22e-407d-8450-1f6caa4e801b_1600x.jpg?v=1631732312" alt="" />
                                    </div>
                                    <div class="short-desc plp-product__details">

                                        <h3 class="plp-product__title">Sweatshirts</h3>
                                    </div>
                                </div>

                                <div className="sweat-pants">
                                    <div class="sweat-pants-img">
                                        <img onClick={() => {
                                            setType("Sweatpants")
                                        }} className="img3" src="//cdn.shopify.com/s/files/1/0302/7829/files/2_a74c8f95-2624-47d5-8a3b-947e2cf71158_1600x.jpg?v=1631732319" alt="" />
                                    </div>
                                    <div class="short-desc plp-product__details">
<h3 class="plp-product__title">Sweatpants</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="new-balance">
                                <div className="image-square">
                                    <img className="nb-img" src="//cdn.shopify.com/s/files/1/0302/7829/files/Aime_FW20_NB_Lifestyle_0975-2_2048x.jpg?v=1631819878" alt="" />

                                    <div class="module-email__content">
                                        <div class="top-caption">coming soon</div>
                                        <div class="mid-caption">
                                            <h2>ALD / New Balance P550</h2>

                                        </div>
                                        <div class="bot-caption">sign up for more information</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="js-products">

                    {
                        filteredProducts ? (
                            type ? (
                                <>
                                    <Button onClick={() => setType(null)}>Show all products</Button>
                                    <div className="content">
                                        <div className="content-block">
                                            {filteredProducts.map(item => {
                                                return <MediaCard item={item} key={item.id} />
                                            })
                                            }
                                        </div>

                                    </div>
                                </>
                            ) : (
                                <div className="content">
                                    <div className="content-block">
                                        {currentPosts.map(item => (
                                            <MediaCard item={item} key={item.id} />
                                        ))
                                        }
                                    </div>
                                    <Pagination />
                                </div>
                            )
                        ) : (
                            <h2>Loading...</h2>
                        )}
                </div>
            </div>
        </>

    );
};

export default Content;
