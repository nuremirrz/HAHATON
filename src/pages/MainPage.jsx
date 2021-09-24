import { Container } from '@material-ui/core';
import React from 'react';
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import Pagination from '../components/Pagination';




const MainPage = () => {
    return (
        <div>
            <Navbar/>
            <div class="top-bar top-bar--visible top-bar--fixed">
                Bishkek, KG | Friday, September 24, 2021 <span class="d-none d-lg-block">&nbsp;| 9:30 PM</span>
            </div>
            <Container>                
                <div className="main">
                    
                <Content />
                </div>
            </Container>
            {/* <Pagination/> */}
        </div>
    );
};

export default MainPage;