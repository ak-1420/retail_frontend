import { createAsyncThunk }  from "@reduxjs/toolkit"
import { ADD_CART_ITEM_URL, DELETE_CART_ITEM_URL, GET_CART_ITEMS_URL, GET_CART_PRICE_URL, GET_PRODUCTS_URL, GET_PRODUCT_BY_ID_URL, LOGIN_URL, REGISTER_URL, UPDATE_CART_ITEM_URL } from "../constants/userConstants"


// authentication
export const register = createAsyncThunk(
    "user/register",
    async ({username , email , password}) => {
        let response = await fetch(REGISTER_URL , {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        })

        let json = await response.json()
        return json
    }
)

export const login = createAsyncThunk(
    "user/login",
    async ({username , password}) => {

        let response = await fetch(LOGIN_URL , {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        let json = await response.json()
        return json
    }
)

// products
export const getProducts = createAsyncThunk(
    "user/getProducts",
    async ({productName , token}) => {


        let url = GET_PRODUCTS_URL
        if(productName){
              url += `?product_name=${productName}`
        }
        
        let response = await fetch(url , {
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            },
        })

        let json = await response.json()
        return json
    }
)

export const getProductById = createAsyncThunk(
    "user/getProductById",
    async ({token , productId}) => {
        let response = fetch(`${GET_PRODUCT_BY_ID_URL}/${productId}`,{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        let json = await response.json()
        return json
    }
)


//cart
export const getCartItems =  createAsyncThunk(
    "user/getCartItems",
     async ({token}) => {
         let response = await fetch(GET_CART_ITEMS_URL,{
             method:'GET',
             headers:{
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            }
         })

        let json = await response.json()
        return json
     }
)

export const addItemToCart =  createAsyncThunk(
    "user/addItemToCart",
    async ({token , cartItem }) => {
        let response = await fetch(ADD_CART_ITEM_URL,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                "user_id": cartItem.userId,
                "product_id" : cartItem.productId,
                "quantity": cartItem.quantity,
                "unit_price" : cartItem.unitPrice
            })
        })

        let json = await response.json()
        return json
    }
)

export const deleteItemFromCart =  createAsyncThunk(
    "user/deleteItemFromCart",
    async ({token , productId}) => {
        let response = await fetch(`${DELETE_CART_ITEM_URL}?product_id=${productId}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            }
        })

        let json = await response.json()
        return json
    }
)

export const updateCartItem =  createAsyncThunk(
    "user/updateCartItem",
    async ({token , cartItem}) => {
        let response = await fetch(UPDATE_CART_ITEM_URL,{
            method:'PATCH',
            headers:{
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                "user_id" : cartItem.userId,
                "product_id" : cartItem.productId,
                "quantity" : cartItem.quantity,
                "unit_price" : cartItem.unitPrice
            })
        })

        let json = await response.json()
        return json
    }
)

export const getCartItemsPrice =  createAsyncThunk(
    "user/getCartItemsPrice",
    async ({token}) => {
        let response = await fetch(GET_CART_PRICE_URL,{
            method: "GET",
            headers:{
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            }
        })

        let json = await response.json()
        return json
    }
)

