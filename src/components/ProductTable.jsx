import React, { useContext, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { adminContext } from '../contexts/AdminContext';
import Grid from '@material-ui/core/Grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router';
import { Button, TextField } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function ProductTable() {
    const classes = useStyles();
    const { products, getProduct, deleteProduct, getProductToEdit, saveEditedProduct, productToEdit } = useContext(adminContext)
    useEffect(() => {
        getProduct()
    }, [])

    //// edit START
    const [editProducts, setEditProducts] = useState(productToEdit)
    const { id } = useParams()
    const [modal, setModal] = useState(false)
    useEffect(() => {
        setEditProducts(productToEdit)
    }, [productToEdit])
    useEffect(() => {
        getProductToEdit(id)
    }, [])
    const handleInputs = (e) => {
        let obj = {
            ...editProducts,
            [e.target.name]: e.target.value
        }
        setEditProducts(obj)
    }
    //// edit END



    return (
        <>
            {
                products ? (
                    <div className="product-content">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>                                    
                                        <StyledTableCell>№</StyledTableCell>
                                        <StyledTableCell align="center">Название</StyledTableCell>
                                        <StyledTableCell align="center">Тип</StyledTableCell>
                                        <StyledTableCell align="center">Цвет</StyledTableCell>
                                        <StyledTableCell align="center">Описание</StyledTableCell>
                                        <StyledTableCell align="center">Цена</StyledTableCell>
                                        <StyledTableCell align="center">Фото</StyledTableCell>
                                        <StyledTableCell align="center">Материал</StyledTableCell>
                                        <StyledTableCell align="center">Дата выпуска</StyledTableCell>
                                        <StyledTableCell align="center"><DeleteOutlineIcon/></StyledTableCell>
                                        <StyledTableCell align="center"><EditIcon/></StyledTableCell>



                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((row, index) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.title}</StyledTableCell>
                                            <StyledTableCell align="center">{row.type}</StyledTableCell>
                                            <StyledTableCell align="center">{row.color}</StyledTableCell>
                                            <StyledTableCell align="center">{row.description}</StyledTableCell>
                                            <StyledTableCell align="center">{row.price}</StyledTableCell>
                                            <StyledTableCell align="center"><img width="80px" src={row.photo} alt="" /></StyledTableCell>
                                            <StyledTableCell align="center">{row.material}</StyledTableCell>
                                            <StyledTableCell align="center">{row.date}</StyledTableCell>

                                            <StyledTableCell align="center">
                                                <Grid container className={classes.root}>
                                                    <Grid item xs={4}>
                                                        <DeleteOutlineIcon
                                                            onClick={() => deleteProduct(row.id)}
                                                        >Filled</DeleteOutlineIcon>
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>

                                            <StyledTableCell align="center">
                                                <Grid container className={classes.root}>
                                                    <Grid item xs={4}>
                                                        <EditIcon onClick={() => {
                                                            getProductToEdit(row.id)
                                                            setModal(true)
                                                        }}>
                                                        </EditIcon>
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                ) : (
                    <h3>Loading...</h3>
                )
            }

            {
                modal ? (

                    <div className="modal">
                        <div className="modal-body">
                            {
                                editProducts ? (
                                    <div className="inputs-add">
                                        <form >
                                            <div className="form-btn">
                                                <Button onClick={() => setModal(false)}>&times;</Button>
                                            </div>
                                                <h2 className="edit">Введите изменения</h2>                                            
                                                <TextField className="form-inp" value={editProducts.title} id="outlined-basic" label="Название продукта" name="title" variant="outlined" onChange={handleInputs} />
                                                <TextField className="form-inp" value={editProducts.type} id="outlined-basic" label="Тип продукта" name="type" variant="outlined" onChange={handleInputs} />
                                                <TextField className="form-inp" value={editProducts.color} id="outlined-basic" label="Цвет продукта" name="color" variant="outlined" onChange={handleInputs} />
                                                <TextField className="form-inp" value={editProducts.description} id="outlined-basic" label="Описание продукта" name="description" variant="outlined" onChange={handleInputs} />
                                                <TextField className="form-inp" value={editProducts.price} id="outlined-basic" label="Цена продукта" name="price" variant="outlined" onChange={handleInputs} />
                                                <TextField className="form-inp" value={editProducts.photo} id="outlined-basic" label="Фото продукта" name="photo" variant="outlined" onChange={handleInputs} />
                                                <TextField className="form-inp" value={editProducts.material} id="outlined-basic" label="Материал продукта" name="material" variant="outlined" onChange={handleInputs} />
                                                <TextField className="form-inp" value={editProducts.date} id="outlined-basic" label="Дата выпуска продукта" name="date" variant="outlined" onChange={handleInputs} />
                                            


                                            <div className="save-btn">
                                                <Button variant="outlined" color="primary" onClick={(e) => {
                                                    e.preventDefault()
                                                    if (
                                                      !editProducts.title.trim() ||
                                                      !editProducts.type.trim() ||
                                                      !editProducts.color.trim() ||
                                                      !editProducts.description.trim() ||
                                                      !editProducts.price.trim() ||
                                                      !editProducts.photo.trim() ||
                                                      !editProducts.material.trim() ||
                                                      !editProducts.date.trim()
                                                  ) {
                                                      alert("Заполните все поля!")
                                                      return
                                                  }
                                                    saveEditedProduct(editProducts)
                                                    setModal(false)
                                                }}>Сохранить</Button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <h3>Loading...</h3>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    null
                )
            }
        </>


    );
}