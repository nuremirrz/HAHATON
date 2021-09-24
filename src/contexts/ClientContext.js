import axios from 'axios';
import React, { useReducer } from 'react';
import { API } from '../helpers/const';
import { calcSubPrice, calcTotalPrice } from '../helpers/calculator'
export const clientContext = React.createContext()

const INIT_STATE = {
    products: null,
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0 ,
    productsCountInLike: JSON.parse(localStorage.getItem('like')) ? JSON.parse(localStorage.getItem('like')).products.length : 0 ,
    cart: null,
    like: null,
    types: []
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return { ...state, products: action.payload }
        case "ADD_AND_DELETE_PRODUCT_IN_CART":
            return {...state, productsCountInCart: action.payload} 
        case "ADD_AND_DELETE_PRODUCT_IN_LIKE":
            return {...state, productsCountInLike: action.payload}                 
        case "GET_CART":
            return {...state, cart: action.payload}
        case "GET_LIKE":
            return {...state, like: action.payload}
        case "GET_TYPES":
            return {...state, types: action.payload}        
        default:
            return { ...state }
    }
}

const ClientContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProduct = async () => {
        console.log(window.location)
        const { data } = await axios(`${API}${window.location.search}`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const addAndDeleteProductInCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0,
            }
        }
        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0,
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        let newCart = cart.products.filter(item => item.product.id === product.id)
        if(newCart.length) {
            cart.products = cart.products.filter(item => item.product.id !== product.id)
        } 
        else {
            cart.products.push(newProduct)
        }
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })


        console.log(cart)
        // console.log(product)
    }
    //like started
    const addAndDeleteProductInLike = (product) => {
        let like = JSON.parse(localStorage.getItem("like"))
        if (!like) {
            like = {
                products: [],                
            }
        }
        let newProduct = {
            product: product,
            count: 1,
            
        }  
        console.log(newProduct)      
        let newLike = like.products.filter(item => item.product.id === product.id)
        if(newLike.length) {
            like.products = like.products.filter(item => item.product.id !== product.id)
        } 
        else {
            like.products.push(newProduct)
        }        
        localStorage.setItem("like", JSON.stringify(like))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_LIKE",
            payload: like.products.length
        })


        console.log(like)
        // console.log(product)
    }
    const checkProductInLike = (id) =>{
        let like = JSON.parse(localStorage.getItem('like'))
        if(!like) {
            return false
        }
        let newLike = like.products.filter(item => item.product.id === id)
        return !newLike.length ? true : false
    }    
    const getLike = () =>{
        
        let like = JSON.parse(localStorage.getItem('like'))
        dispatch({
            type: 'GET_LIKE',
            payload: like
        })
    }
    //like end
    const checkProductInCart = (id) =>{
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            return false
        }
        let newCart = cart.products.filter(item => item.product.id === id)
        return !newCart.length ? true : false
    }    
    const getCart = () =>{
        
        let cart = JSON.parse(localStorage.getItem('cart'))
        dispatch({
            type: 'GET_CART',
            payload: cart
        })
    }
    const changeCountProducts = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            return
        }
        cart.products = cart.products.map(item => {
            if(item.product.id === id){
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        }) 
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }
    const getTypes = async () => {
        const {data} =  await axios(API)
        const arr = []
        data.forEach(item =>{
            arr.push(item.type)
        })
        let newArr = []
        arr.forEach(elem =>{
            console.log(arr, newArr)
            let check = newArr.filter(item => item.trim() === elem.trim() )
            if(check.length === 0){
                newArr.push(elem)
            }
        })
        dispatch ({
            type: 'GET_TYPES',
            payload: newArr
        })
    }
    //pagination  start
    const [posts, setPosts] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [postsPerPage] = React.useState(4)

    React.useEffect(() => {
        const fetchProducts = () => {
            const data = state.products || []
            setPosts(data)
        }
        fetchProducts()
    }, [state.products])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPosts = posts.length
    console.log(currentPosts)

    const changePage = (newPage) => {
        setCurrentPage(newPage)
    }

    //paginations end
    //login, user started
    const createNewUser = async (newUser, history) => {
        try{
            const data = await axios.post('https://intense-retreat-64750.herokuapp.com/auth/registration', newUser)
            console.log(data)
            history.push('/')
        }
        catch(e) {
            console.log(e.response)
            alert(e.response.data.message)
        }
        
    }
    const login = async (user, history) => {
        console.log(user)
        try {
            const { data } =  await axios.post('https://intense-retreat-64750.herokuapp.com/auth/login', user)
            console.log(data)
            history.push("/")
        }catch(e) {
            console.log(e.response)
            alert(e.response)
        }
    }
    //login, user end  

    return (
        <clientContext.Provider value={{
            products: state.products,
            productsCountInCart: state.productsCountInCart,
            cart: state.cart,
            types: state.types,
            like: state.like,
            productsCountInLike: state.productsCountInLike,
            getProduct, 
            currentPosts,
            postsPerPage,
            totalPosts,
            createNewUser,
            changePage,
            login,
            addAndDeleteProductInCart,
            addAndDeleteProductInLike,
            checkProductInCart,
            checkProductInLike,
            getLike,
            getCart,
            changeCountProducts,
            getTypes   
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;