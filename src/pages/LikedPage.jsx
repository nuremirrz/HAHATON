import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@material-ui/core';
import LikedTable from '../components/LikedTable';

const LikedPage = () => {
    return (
        <div>
            <Navbar/>
            <Container>
                <div>
                    <h2 id="h3">Favorites</h2>
                    <LikedTable />                    
                </div>
            </Container>
        </div>
    );
};

export default LikedPage;