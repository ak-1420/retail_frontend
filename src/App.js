import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Routes , Route, useNavigate} from "react-router-dom"
import { Home } from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Products } from "./pages/Products";
import { PageNotFound } from "./pages/PageNotFound";
import { getCartItems, getCartItemsPrice } from "./redux/actions/userActions";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { CartView } from "./pages/Checkout/CartView";
import { parseJwt } from "./util";
import { logout } from "./redux/features/userSlice";

const MINUTE_MS = 60000;


function App() {

  const navigate = useNavigate()

  const state = useSelector((state) => state.user)

  const dispatch = useDispatch()
 
useEffect(() => {
  const interval = setInterval(() => {
    if(state.token){
      const exp = parseJwt(state.token).exp
     const expired = Date.now() >= exp * 1000

     console.log('exp :' , exp * 1000 , expired)
     if(expired){
       dispatch(logout())
     }
    }
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])

  useEffect(() => {
      if(state.api.type === "login_request_fulfilled"){
         navigate('/products')
      }
  },[state.api.type])

  useEffect(() => {
     if(state.api.type === "register_request_fulfilled"){
       console.log('going here')
       navigate('/sign-in')
     }
  },[state.api.type])

  useEffect(() => {
    if(!state.token && (window.location.pathname !== "/sign-in" && window.location.pathname !== "/sign-up")){
        navigate('/')
    }
  },[state.token , window.location.pathname])

  useEffect(() => {
    if(state.token){
      dispatch(getCartItems({
        token : state.token
       }))
   }
  },[])


  useEffect(() => {
    if(state.api.type === "add_item_to_cart_fulfilled"){
    if(state.token){
       dispatch(getCartItems({
         token : state.token
        }))
    }
  }
  },[state.api.type])


  useEffect(() => {
      if(state.api.type === "delete_item_from_cart_fulfilled" || state.api.type === "add_item_to_cart_fulfilled"){
          if(state.token){
            dispatch(getCartItemsPrice({token : state.token}))
          }
      }
  },[state.api.type])


  useEffect(() => {
    if(state.api.type === "delete_item_from_cart_fulfilled"){
    if(state.token){
       dispatch(getCartItems({
         token : state.token
        }))
    }
  }
  },[state.api.type])

  return (
    <div>
         <Routes>
              <Route exact path="/" element={<Home/>} />
              { (!state.token) && <Route path="/sign-up" element={<SignUp />} />}
              {(!state.token) && <Route path="/sign-in" element={<SignIn />} />}
              {(state.token) && <Route path="/products" element={<Products />} />}
              {(state.token) && <Route path="/products/:id" element={<ProductDetail />} />}
              {(state.token) && <Route path="/checkout" element={<Checkout /> } />}
              {(state.token) && <Route path="/cart" element={<CartView /> } />}
              <Route path="*" element={<PageNotFound />}/>
         </Routes>
    </div>
  );
}

export default App;
