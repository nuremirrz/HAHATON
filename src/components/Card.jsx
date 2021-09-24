import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Truncate from 'react-truncate';
import { clientContext } from '../contexts/ClientContext'
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    maxWidth: 280,
    margin: "0px 10px 10px 100px",
    width: 240,
    minWidth: 240,
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    width:300,
    height: 300,
    backgroundSize: "contain",
    bacgroundColor: "rgb(197, 199, 214)"
  },
});

export default function MediaCard({ item }) {
  const classes = useStyles();
  const { addAndDeleteProductInCart, addAndDeleteProductInLike, checkProductInCart } = useContext(clientContext)
  console.log(item)
  return (
    <Card className="cartochka">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.photo}
          title="Wear"
        />
        <CardContent>
          <Typography variant="h6" component="h2" noWrap>
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              <Truncate lines={3} ellipsis={<span>Далее</span>}>
               {item.description}
              </Truncate>              
              {/* <span style={{display: "block", fontSize: "16px"}}>Цена: {item.price} сом</span> */}
          </Typography>
          <h3>Цена: {item.price} сом</h3>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
        onClick={() => addAndDeleteProductInCart(item)? "primary" : "secondary"} 
        size="small" 
        color="default">
          <ShoppingCartIcon/> 
        </Button>
        <Button
        onClick={() => addAndDeleteProductInLike(item)? "secondary" : "primary"}
        size="small"
        color="default" >
          <FavoriteIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
