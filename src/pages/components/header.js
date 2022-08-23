import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Hidden } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Profile from '../../Components/Header/Navtabs/profile'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
// import SideNav from "../../Components/Header/sitenav";
import { Avatar } from "@mui/material";
import  AuthContext  from "../../Context/AuthProvider";
import { useContext } from "react";

export default function ButtonAppBar() {
  //This object is for authentication purpose
  const {auth, seAuth} = useContext(AuthContext);
  
  const Styles = {

    HeaderStyle: {
      background: "#030F27",
    },
    HeaderText: {
      fontFamily: "Montserrat",
    },
    imgStyle: {
      width: "40px",
      height: "40px",
    },
    iconStyle: {
      width: "32px",
      height: "32px",
    },
  };

  return (
    //Creating a Header For website including logo , company name and user login name... 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={Styles.HeaderStyle}>
        <Toolbar style={{minHeight : "53px"}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, justifyContent: "space-between", display: "flex"  }}>
            <div>
            <img
              src={require("../../Assets/icon-VCTech.png")}
              alt=""
              style={Styles.imgStyle}
            />
            <strong className="mx-2">VC Tech</strong>
            </div>
            { auth.role!=="admin" &&
            <div style={{display:"flex"}}>
           <div style={{marginRight:"3px"}}>{auth.name}</div> 
           <Avatar alt="Remy Sharp" src={require("../../Assets/personIcon.png")}
           sx={{width:35, height:35, ml: 1}}/>
           
            </div>
 }
          </Typography>
          {/* <Hidden mdDown>
            <Profile />
          </Hidden>
          <Hidden mdUp>
              <SideNav />
          </Hidden> */}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
