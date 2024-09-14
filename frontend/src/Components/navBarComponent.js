import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Alert, Button, ClickAwayListener, Snackbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchCategories, itemSuccess } from '../Redux/actions';
import AddItem from './AddItem';
import { NotificationComponent } from './NotificationComponent';
import SearchComponent from './searchComponent';
import useAuth from "./useAuth";


function PrimarySearchAppBar(props) {
  
  const dispatch = useDispatch();
  React.useEffect(()=>{
      dispatch(fetchCategories({"value": "", "category": 0 }));
  }, [])

  const success = props.data?.success
  ? props.data?.success
  : false;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorPopperEl, setAnchorPopperEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openPopper, setOpenPopper] = React.useState(false);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let navigate = useNavigate()

  const handleMessages = (event) => {
    navigate('/chat')
  }

  const goToHome = (event) => {
    navigate('/')
  }

  const handlePopper = (event) => {
    console.log("hello world")
    console.log(openPopper)
    setAnchorPopperEl(event.currentTarget);
    setOpenPopper((prev) => !prev);
    console.log(openPopper)
  };


  const handleClickAway = () => {
    setOpenPopper(false);
  }
  const { authed, login, logout } = useAuth();
  const loc  = useLocation();
  const handleLogin = () => {
    navigate("/login");
    // login().then((res) => {
    //   console.log(res)
    //   console.log(authed)
    //   console.log("Login successful")
    //   navigate(state?.path || "/");
    // });
  };

  const handleLogout = () => {
    handleMenuClose()
    logout().then((res) => {
      console.log("Logout succcessful")
    })
  }


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Items</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <Link to="/chat">
          <p>Messages</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handlePopper}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(itemSuccess(false));
  };


  return (


    <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex:1}}>
      {<Snackbar open={success} autoHideDuration={6000} onClose={handleClose}><Alert severity="success">Item Posted succcessfuly</Alert></Snackbar>}
      <AddItem open={open} setOpen={setOpen} />
      <NotificationComponent openPopper={openPopper} anchorPopperEl={anchorPopperEl} />

      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <HomeIcon onClick={goToHome} sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }} />
          <SearchComponent />
          <Box sx={{ flexGrow: 1 }} />
          {authed ? <React.Fragment> {loc?.pathname === "/" && <Button color="inherit" sx={[{ "&:hover": { backgroundColor: 'grey' }, "backgroundColor": "#bebebe3d" }]} onClick={handleOpen}>Add Item</Button>}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">

                  <MailIcon onClick={handleMessages} />

                </Badge>
              </IconButton>
              <ClickAwayListener onClickAway={handleClickAway}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handlePopper}
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </ClickAwayListener>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box></React.Fragment> : <Button color="inherit" onClick={handleLogin} sx={[{ "&:hover": { backgroundColor: 'grey' } }]}>Login</Button>}

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
function mapStateToProps(state){
  return {
      "data": state.productReducer,
  }
}


export default connect(mapStateToProps)(PrimarySearchAppBar)