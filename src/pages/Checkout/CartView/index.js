import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@emotion/react';
import { AppBar, Button, Container, createTheme, CssBaseline, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCartItemsPrice } from '../../../redux/actions/userActions';
import { useNavigate } from 'react-router';




const theme = createTheme()
export const CartView = () => {
   
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if(state.token){
            dispatch(getCartItemsPrice({
                token : state.token
            }))
         }
    },[])

    const state = useSelector((state) => state.user)

    const products = state?.cart?.map((ci) => {
        return {
            id : ci.product_id,
            name : ci.product.name,
            unit_price : ci.unit_price,
            quantity : ci.quantity,
            desc : ci.product.description,
            item_total : ci.unit_price * ci.quantity,
            image: ci.product.image
        }
    })

  return (
    <ThemeProvider theme ={theme}>
        <CssBaseline />
        <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Retail Web App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container components="main" maxWidth="md" sx={{mb : 4}}>
      <Typography variant="h6" gutterBottom>
         Cart Items
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">₹ {product.item_total}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
             ₹ {state?.cartPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
           <Grid item xs={12}>
           <div className="align-right">
           <Button onClick={() => navigate('/checkout')} xs={{margin: 5}} variant="contained">Check out</Button>
           </div>
           </Grid>
         
    </Grid>
      </Container>
      </ThemeProvider>
  );
}