import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
// import {useNavigate } from "react-router-dom"

export default function Profile() {
  const [show, setshow] = useState(false);
  const Styles = {
    iconStyle: {
      width: "32px",
      height: "32px",
    },
  };
  // const navigate = useNavigate()
  
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // setshow(true)
  };

  const dropDownData = [
      {
          label: "Profile", icon: <PersonIcon/>
      },
      {
          label: "Logout", icon: <LogoutIcon/>
      }
  ]
  return (
    <div>

    { show ? <Box>
     <span>Username</span>
     <Button
       id="basic-button"
       aria-controls={open ? "basic-menu" : undefined}
       aria-haspopup="true"
       aria-expanded={open ? "true" : undefined}
       onClick={handleClick}
     >
       <IconButton
         onClick={handleClick}
         size="small"
         aria-controls={open ? "account-menu" : undefined}
         aria-haspopup="true"
         aria-expanded={open ? "true" : undefined}
       >
         <Avatar sx={{ width: 32, height: 32 }}>
           <img
             src={require("../../../Assets/personIcon.png")}
             alt=""
             style={Styles.iconStyle}
           />
         </Avatar>
       </IconButton>
     </Button>
     <Menu
       id="basic-menu"
       anchorEl={anchorEl}
       open={open}
       onClose={handleClose}
       MenuListProps={{
         "aria-labelledby": "basic-button",
       }}
     >
         {dropDownData.map((item, i)=>{

           return <MenuItem key= {i} component={ListItem} onClick={handleClose}>
               {console.log(item.icon)}
               <ListItemIcon>{item.icon}</ListItemIcon>
               <ListItemText>{item.label}</ListItemText>
           </MenuItem>
         })}
     </Menu>
   </Box> : null}
    </div>
  );
}
