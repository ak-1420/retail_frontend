import { ThemeProvider } from "@emotion/react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router";
import { logout } from "../../redux/features/userSlice";
import { addItemToCart, deleteItemFromCart } from "../../redux/actions/userActions";

const theme = createTheme();

export const ProductDetail = () => {

  const [quantity, setQuantity] = useState(1);
  const [addClicked , setAddClicked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  const deleteItem = () => {
      // delete item fromm cart
      const payload = {
          token : state.token,
          productId : state?.product_detail?.id
      }

      if(payload.token && payload.productId){
          dispatch(deleteItemFromCart(payload))
          setAddClicked(false)
          setQuantity(1)
      }
  }

  const addToCart = () => {
    
    setAddClicked(true)

      const payload = {
          token : state.token,
          cartItem:{
              userId: state.user.userId,
              productId: state.product_detail.id,
              quantity: quantity,
              unitPrice: state.product_detail.price
          }
      }

      if(state.token && state.user.userId){
          dispatch(addItemToCart(payload))

      }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <ShoppingBasketIcon sx={{ mr: 2 }} />
          <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit" noWrap>
            Retail App
          </Typography>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={state?.cart?.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardMedia
                    component="img"
                    image={state?.product_detail?.image}
                    alt="product detail"
                  />
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {state?.product_detail?.name}
                    </Typography>

                    <Typography>
                      {state?.product_detail?.description}
                    </Typography>

                    <Box mt={2} >
                      <Chip
                        sx={{margin:2}}
                        label={state?.product_detail?.category}
                        variant="outlined"
                      />
                      <Chip
                        sx={{margin:2}}
                        label={`₹ ${state?.product_detail?.price}`}
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>

                  <CardActions>
                    <IconButton onClick={() => {if(quantity > 1) setQuantity(quantity - 1)}} aria-label="decrement">
                      <RemoveIcon color="primary" />
                    </IconButton>
                    <Button size="small">
                        <Typography>
                        {quantity} 
                        </Typography> 
                    </Button>
                    <IconButton aria-label="increment" onClick={() => {setQuantity(quantity + 1)}}>
                      <AddIcon color="primary" />
                    </IconButton>
                  </CardActions>

                  <Button disabled={addClicked} sx={{margin : 2}} variant="contained" size="medium" onClick={addToCart}>
                      Add to Cart
                  </Button>

                  <IconButton disabled={!addClicked} aria-label="delete" onClick={deleteItem}>
                        <DeleteIcon color="error" />
                  </IconButton>

                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
    </ThemeProvider>
  );
};
