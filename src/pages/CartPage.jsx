import { Container } from '@material-ui/core';
import React from 'react';
import CartTable from '../components/CartTable';
import Navbar from '../components/Navbar';

const CartPage = () => {
    return (
        <>
            <Navbar />
            <Container>
                <div className="cart">
                    <h2 id="h2">Shopping cart</h2>
                    <CartTable />
                </div>
            </Container>
        </>
    );
};

export default CartPage;
