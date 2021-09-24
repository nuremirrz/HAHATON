import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { clientContext } from '../contexts/ClientContext';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function LikedTable() {
  const classes = useStyles();
  const {like, getLike, changeCountProducts } = useContext(clientContext)
  useEffect(() => {
    getLike()
  }, [])
  console.log(like)

  
  return (
    <>
        {
            like ? (
        
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">                    
                    <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell align="left">Название</TableCell>                                              
                        <TableCell align="left">Фото</TableCell>
                        <TableCell align="left">Тип</TableCell>                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {like.products.map((row, index) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {index + 1 }
                        </TableCell>
                        <TableCell align="left">{row.product.title}</TableCell>
                        <TableCell align="left">
                          <img width="100" src={row.product.photo} alt="" />
                        </TableCell>
                        <TableCell align="left">{row.product.type}</TableCell>                                                                         
                        </TableRow>                    
                    ))}
                    </TableBody>                    
                    </Table>                    
                    </TableContainer>
            ) : (
                <h2>Loading...</h2>
            )
        }
    </>    
  );
}
