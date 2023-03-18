import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Copyright } from "../../components/Copyright";
import { addDetailProduct, logout } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { addItemToCart, getProducts } from "../../redux/actions/userActions";
import { Badge, Chip, IconButton } from "@mui/material";

const theme = createTheme();

export const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (state.token){
      dispatch(
        getProducts({
          productName: null,
          token: state.token,
        })
      );
    }
  },[])

  useEffect(() => {
    if(state.api.type === "add_item_to_cart_fulfilled"){
    if (state.token){
      dispatch(
        getProducts({
          productName: null,
          token: state.token,
        })
      );
    }
    }
  }, [state.api.type]);


  const addItem = (product) => {

       const payload = {
         token : state.token,
         cartItem:{
           userId: state.user.userId,
           productId : product.id,
           quantity : 1,
           unitPrice : product.price
         }
       }
       if(state.token && state.user.userId){
            dispatch(addItemToCart(payload))
       }
  }

  const removeItem = (productId) => {
           
  }

  const handleView = (product) => {
       dispatch(addDetailProduct(product))
       navigate(`/products/${product.id}`)
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
        {/* Hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {state?.products?.map((p) => (
              <Grid item key={p.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={p.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {p.name}
                    </Typography>
                    <Typography>{p.description}</Typography>
                    
                    <Box mt={2}>
                    <Chip  label={p.category} variant="outlined" />
                    <Chip  label={ `₹ ${p.price}`} variant="outlined" />
                    </Box>
                   
                  </CardContent>
                  <CardActions>
                    <Button  size="small" onClick={() =>  {(state?.cart?.filter((ce) => ce?.product_id)?.includes(p?.id)) ? removeItem(p?.id) : addItem(p) } } >
                      { (state?.cart?.filter((ce) => ce?.product_id)?.includes(p.id)) ? "Remove" : "Add"}
                      </Button>
                    <Button
                      size="small"
                      onClick={() => handleView(p)}
                    >
                      view
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};
