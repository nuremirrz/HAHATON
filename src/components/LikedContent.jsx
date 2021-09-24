import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { clientContext } from '../contexts/ClientContext';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 345,
  },
});

export default function MediaCard({ item}) {
  const classes = useStyles();
  const { addAndDeleteProductInLike, checkProductInLike } = useContext(clientContext)
  console.log(item)
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // image={item.photo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" noWrap>
            {/* {item.title} */}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* {item.description} */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
        className="fav-icon"
        onClick={() => addAndDeleteProductInLike(item)} 
        size="small" 
        color="primary">
          <FavoriteIcon  
            // color={checkProductInCart(item.id) ? "primary" : "secondary"}
          />
        </Button>            
      </CardActions>
    </Card>
  );
}
