import React from 'react';
import AddProduct from '../components/AddProduct';
import ProductTable from '../components/ProductTable';

const AdminPage = () => {
    return (
        <div>
            <AddProduct />
            <ProductTable />
        </div>
    );
};

export default AdminPage;