import { createSlice } from "@reduxjs/toolkit"
import { parseJwt } from "../../util";
import {login , register , getProducts , getProductById , getCartItems , addItemToCart ,deleteItemFromCart, updateCartItem , getCartItemsPrice} from "../actions/userActions"


const defaultState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user : {
        userId : localStorage.getItem("token") ? parseJwt(JSON.parse(localStorage.getItem("token")))?.sub?.id : null,
        username : localStorage.getItem("token") ? parseJwt(JSON.parse(localStorage.getItem("token")))?.sub?.username : null,
        exp:  localStorage.getItem("token") ? parseJwt(JSON.parse(localStorage.getItem("token")))?.exp : null,
        iat:  localStorage.getItem("token") ? parseJwt(JSON.parse(localStorage.getItem("token")))?.iat : null,
        email : "",
    },
    products:[],
    product_detail: {},
    cart:[],
    cartPrice: 0,
    api:{
        status: false,
        type: "",
        loading: false,
        message: ""
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
        user : {
            userId : localStorage.getItem("token") ? parseJwt(JSON.parse(localStorage.getItem("token")))?.sub?.id : null,
            username : localStorage.getItem("token") ? parseJwt(JSON.parse(localStorage.getItem("token")))?.sub?.username : null,
            exp:  localStorage.getItem("token") ? parseJwt(JSON.parse(localStorage.getItem("token")))?.exp : null,
            iat:  localStorage.getItem("token") ? parseJwt(JSON.parse(localStorage.getItem("token")))?.iat : null,
            email : "",
        },
        products:[],
        product_detail: {},
        cart:[],
        cartPrice: 0,
        api:{
            status: false,
            type: "",
            loading: false,
            message: ""
        }
    },

    reducers:{

        addDetailProduct : (state = defaultState , action) => {
                return {
                    ...state,
                    product_detail: action.payload
                }
        },

        logout : (state = defaultState) => {
            localStorage.clear();
            return {
                ...state,
                token:null,
                user:{
                    iat:null,
                    exp:null,
                    userId:null,
                    username:null,
                    email:null
                }
            }
        }
    },


    extraReducers : (builder) => {

        builder.addCase(login.pending , (state) => {
           state.api.loading = true
           state.api.mesaage = "login api pending"
           state.api.type = "login_request_pending"
        })

        builder.addCase(login.fulfilled , (state , {payload}) => {
            state.api.loading = true
            state.api.mesaage = "login request fulfilled"
            state.api.type = "login_request_fulfilled"
            state.token = payload.token
            state.user.exp = parseJwt(payload.token).exp 
            state.user.iat = parseJwt(payload.token).iat 
            state.user.userId = parseJwt(payload.token).sub.id 
            state.user.username = parseJwt(payload.token).sub.username
            localStorage.setItem('token' , JSON.stringify(payload.token))
         })

         builder.addCase(login.rejected , (state) => {
            state.api.loading = true
            state.api.mesaage = "login api rejected"
            state.api.type = "login_request_rejected"
         })

         builder.addCase(register.pending , (state) => {
            state.api.loading = true
            state.api.mesaage = "register api pending"
            state.api.type = "register_request_pending"
         })

         builder.addCase(register.fulfilled , (state , {payload}) => {
             state.api.loading = false
             state.api.message = "register api fulfilled"
             state.api.type = "register_request_fulfilled"
             state.user.username = payload.data.username 
             state.user.email = payload.data.email 
             state.user.userId = payload.data.userId
             console.log('register response :' , payload)
         })

         builder.addCase(register.rejected , (state , {payload}) => {
             state.api.loading = false 
             state.api.message = "register api rejected"
             state.api.type = "register_request_rejected"
             console.log("register response : ", payload)
         })

         builder.addCase(getProducts.pending , (state ) => {
             state.api.loading = true
             state.api.message = "get products pending"
             state.api.type = "get_products_pending"
         })

         builder.addCase(getProducts.fulfilled , (state , {payload}) => {
             state.api.loading = false
             state.api.message = "get products fulfilled"
             state.api.type = "get_products_fulfilled"
             state.products = payload.data
         })

         builder.addCase(getProducts.rejected , (state , {payload}) => {
             state.api.loading = false
             state.api.message = "get products request rejected"
             state.api.type = "get_products_rejected"
         })

         builder.addCase(getProductById.pending , (state) => {
             state.api.loading = false 
             state.api.message = "get product by id pending" 
             state.api.type = "get_product_by_id_pending"
         })

         builder.addCase(getProductById.fulfilled , (state , {payload} ) => {
            state.api.loading = false 
            state.api.message = "get product by id fulfilled" 
            state.api.type = "get_product_by_id_fulfilled"
            state.product_detail = payload.data  
         })
         
         builder.addCase(getProductById.rejected , (state , {payload}) => {
             state.api.loading = false
             state.api.message = "get product by id rejected"
             state.api.type = "get_product_by_id_rejected"
         })
     

         builder.addCase(getCartItems.pending , (state) => {
             state.api.loading = true
             state.api.message = "get cart items pending"
             state.api.type = "get_cart_items_pending"
         })

         builder.addCase(getCartItems.fulfilled , (state , {payload}) => {
             state.api.loading = false
             state.api.mesaage = "get cart items fulfilled"
             state.api.type = "get_cart_items_fulfilled"
             state.cart = payload.data
         })

         builder.addCase(getCartItems.rejected , (state , {payload}) => {
                state.api.loading = false 
                state.api.mesaage = "get cart items rejected"
                state.api.type = "get_cart_items_rejected"
         })
        

         builder.addCase(addItemToCart.pending , (state) => {
             state.api.loading = true
             state.api.message = "add item to cart pending"
             state.api.type = "add_item_to_cart_pending"
         })

         builder.addCase(addItemToCart.fulfilled , (state , {payload}) => {
             state.api.loading = false
             state.api.message = "add item to cart fulflled" 
             state.api.type = "add_item_to_cart_fulfilled"
             console.log('add item cart response ' , payload)
         })
        
         builder.addCase(addItemToCart.rejected , (state , {payload}) => {
             state.api.loading = false 
             state.api.message = "add item to cart rejected"
             state.api.type = "add_item_to_cart_rejected"
             console.log("add item to cart rejected" , payload)
         })

         builder.addCase(deleteItemFromCart.pending , (state) => {
             state.api.loading = true 
             state.api.message = "delete item from cart pending"
             state.api.type = "delete_item_from_cart_pending"
         })
         
         builder.addCase(deleteItemFromCart , (state , {payload}) => {
             state.api.loading = false 
             state.api.message = "delete item from cart fulfilled"
             state.api.type = "delete_item_from_cart_fulfilled"
         })

         builder.addCase(deleteItemFromCart.rejected , (state , payload) => {
             state.api.loading = false 
             state.api.message = "delete item from cart rejected"
             state.api.type = "delete_item_from_cart_rejected"
         })

         builder.addCase(updateCartItem.pending , (state) => {
             state.api.loading = true 
             state.api.message = "update cart item pending"
             state.api.type = "update_cart_item_pending"
         })

         builder.addCase(updateCartItem.fulfilled , (state , {payload}) => {
             state.api.loading = false
             state.api.message = "update cart item fulfilled"
             state.api.type = "update_cart_item_fulfilled"
         })

         builder.addCase(updateCartItem.rejected , (state , {payload}) => {
             state.api.loading = false 
             state.api.message = "update cart item rejected" 
             state.api.type = "update_cart_item_rejected"
         })

         builder.addCase(getCartItemsPrice.pending , (state) => {
             state.api.loading = true
             state.api.message = "get cart item price pending"
             state.api.type = "get_cart_item_price_pending"
         })

         builder.addCase(getCartItemsPrice.fulfilled , (state , { payload }) => {
             state.api.loading = false 
             state.api.message = "get cart item price fulfilled"
             state.api.type = "get_cart_item_price_fulfilled"
             state.cartPrice = payload.data.total
         })

         builder.addCase(getCartItemsPrice.rejected , (state , {payload}) => {
             state.api.loading = false 
             state.api.message = "get cart item price rejected"
             state.api.type = "get_cart_item_price_rejected"
         })


    }
})

export const { logout , addDetailProduct} = userSlice.actions;

export default userSlice.reducer;