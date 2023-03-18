import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Copyright } from "../../components/Copyright"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../redux/actions/userActions"


const theme = createTheme()

export const SignIn = () =>  {

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        
        const payload = {
          username : data.get('username'),
          password: data.get('password')
      }

      
      if(payload.username && payload.password){
        dispatch(login(payload))
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="user-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>

          </Box>

          <Copyright sx={{ mt: 5 }} /> 

        </Container>
      </ThemeProvider>
    );
}