import { Button, Input, TextField } from '@material-ui/core';
import React, { useContext, useState, useStyles } from 'react';
import { adminContext } from '../contexts/AdminContext';


const AddProduct = () => {
    const [products, setProduct] = useState({
        title: "",
        type: "",
        color:"",
        description: "",
        price: "",
        photo: "",
        material: "",
        date: ""
    })
    const { createProduct } = useContext(adminContext)
    function handleInputs(e) {
        let newProduct = {
            ...products,
            [e.target.name]: e.target.value
        }
        setProduct(newProduct)
    }


    
    return (
        <div> 
            <h2 className="edit">Добавьте товар</h2>
            <div className="inputs-add">
                <form className="form-add" >
                    <TextField className="addprod-inp"value={products.title} id="outlined-basic" label="Название " name="title" variant="outlined" onChange={handleInputs} />
                    <TextField className="addprod-inp"value={products.type} id="outlined-basic" label="Тип " name="type" variant="outlined" onChange={handleInputs} />
                    <TextField className="addprod-inp"value={products.color} id="outlined-basic" label="Цвет " name="color" variant="outlined" onChange={handleInputs} />
                    <TextField className="addprod-inp"value={products.description} id="outlined-basic" label="Описание " name="description" variant="outlined" onChange={handleInputs} />
                    <TextField className="addprod-inp"value={products.price} id="outlined-basic" label="Цена " name="price" variant="outlined" onChange={handleInputs} />
                    <TextField className="addprod-inp"value={products.photo} id="outlined-basic" label="Фото " name="photo" variant="outlined" onChange={handleInputs} />
                    <TextField className="addprod-inp"value={products.material} id="outlined-basic" label="Материал " name="material" variant="outlined" onChange={handleInputs} />
                    <TextField className="addprod-inp"value={products.date} id="outlined-basic" label="Дата выпуска " name="date" variant="outlined" onChange={handleInputs} />
                    <div className="add-btn">
                        <Button variant="outlined" color="primary" onClick={(e) => {
                            e.preventDefault()
                            if (
                                !products.title.trim() ||
                                !products.type.trim() ||
                                !products.color.trim() ||
                                !products.description.trim() ||
                                !products.price.trim() ||
                                !products.photo.trim() ||
                                !products.material.trim() ||
                                !products.date.trim()
                            ) {
                                alert("Заполните все поля!")
                                return
                            }
                            createProduct({
                                title: products.title.trim(),
                                type: products.type.trim(),
                                color: products.color.trim(),
                                description: products.description.trim(),
                                price: products.price.trim(),
                                photo: products.photo.trim(),
                                material: products.material.trim(),
                                date: products.date.trim()
                            })
                        }}>Добавить</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}






export default AddProduct;