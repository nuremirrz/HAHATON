import React, { useContext, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import yellow from '@material-ui/core/colors/yellow';
import MoreIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link, useHistory } from 'react-router-dom';
import { clientContext } from '../contexts/ClientContext';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const color = yellow[50];
const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: yellow[50],
  },  
  grow: {
    flexGrow: 1,
    alignItems: "center",
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
    
  },
  title: {
    display: 'none',
    color: "black",
    fontFamily: "Bebas Neue",
    fontSize: "30px",
    textDecoration: "none",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    border:" 1px solid black",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(167, 157, 157)'
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    color: 'black',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default function Navbar() {
  const { productsCountInCart, productsCountInLike, getProduct} = useContext(clientContext)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}      
    >
      <Link to="/sign-in">
        <MenuItem >Войти</MenuItem>      
      </Link>
      <Link to="/sign-up">
        <MenuItem >Регистрация</MenuItem>           
      </Link>
    </Menu>
  );
  
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show new mails" color="inherit">
          <Badge badgeContent={productsCountInCart} color="secondary">
            <Link to="/cart" className="shopcart">
              <ShoppingCartIcon/>                
            </Link>
          </Badge>
        </IconButton>
        <p>Shopping Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show new notifications" color="inherit">
          <Badge badgeContent={productsCountInLike} color="secondary">
            <Link to="/like" className="like">
              <FavoriteIcon />                                  
            </Link>
          </Badge>
        </IconButton>
        <p>Liked</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
    //search started
    const history = useHistory()
    const [searchValue, setSearchValue] = React.useState("")
    const filterProducts = (key, value) => {
      let search = new URLSearchParams(history.location.search) 
      search.set(key, value)       
      let url = `${history.location.pathname}?${search.toString()}`        
      history.push(url) 
      setSearchValue(search.get('q'))     
      getProduct()
  }
  let search = new URLSearchParams(history.location.search) 
  useEffect(() =>{
    setSearchValue(search.get('q') || "")
  }, [history.location])
  console.log(history.location)

    //search ended
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.navbar} >
        <Toolbar>          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={(e) => filterProducts('q', e.target.value)}
              value={searchValue}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
              <Typography className={classes.title} variant="h6" noWrap >
                <Link to="/" className="adem">
                  Adem            
                </Link>
              </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="black">
              <Badge badgeContent={productsCountInCart} color="secondary">
                <Link to="/cart" className="shopcart">
                <ShoppingCartIcon/>                
                </Link>
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="black">
              <Badge badgeContent={productsCountInLike} color="secondary">
                <Link to="/like" className="like">
                  <FavoriteIcon />                                  
                </Link>
              </Badge>
            </IconButton>
            <IconButton
              className="account"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="black"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="black"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
