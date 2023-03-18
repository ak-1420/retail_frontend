import { Link, Typography } from "@mui/material"
import { FE_BASE_URL } from "../../constants"



export const Copyright = (props) => {
    return (
        <Typography variant="body2" color = "text.secondary" align="center" {...props}>
           {'Copyright © '}
           <Link color="inherit" href={FE_BASE_URL}>
               Retail Web App
           </Link>
           {' '}
           {new Date().getFullYear()}
           {'.'}
        </Typography>
    )
}