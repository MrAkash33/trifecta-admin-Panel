import "./App.css";
import "antd/dist/antd.css";
import logo from "./components/images/logo.png";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppsIcon from "@material-ui/icons/Apps";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Home/Footer";
import Home from "./components/Home/Home";
import PeopleNav from "./components/People/PeopleNav";
import SubAdminNav from "./components/SubAdmin/SubAdminNav";
import RoomManagementNav from "./components/RoomManagement/RoomManagementNav";
import ReservationNav from "./components/Reservation/ReservationNav";
import FrontOfficeNav from "./components/FrontOffice/FrontOfficeNav";
import ConfigurationNav from "./components/Configuration/ConfigurationNav";
import Login from "./components/Home/Login";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import axios from "axios";
import ToDo from "./components/Home/ToDo";
// import {Fullscreen} from "react-full-screen";

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");

const drawerWidth = 220;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(0deg)",
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(180deg)",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
});

class App extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    theme: false,
    isFullScreen: false,
    isLogin: false,
    isToDoPop:false,
    TotalToDo:0
  };
  
  componentDidMount(){
    this.getToDo();
  }

  closeToDoPop = () =>{
    this.setState({
      isToDoPop:false,
    })
    this.getToDo();
  }

  getToDo = async()=>{
    await axios
      .post(`${url}api/ToDo`, {
        hotelId: hotelId,
        flag: 1,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          res.data.response[0].map((item) => {
            this.setState({
              TotalToDo:item.TotalToDo
            });
          });
        }
      });
  }

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  callFullScreen = (val) => {};

  onLogin = (value) => {
    this.setState({ isLogin: value });
  };

  signOut = () => {
    this.setState({ isLogin: false });
    localStorage.clear();
  };

  render() {
    const icon = !this.state.theme ? <Brightness3Icon /> : <Brightness7Icon />;
    let appliedTheme = createMuiTheme(this.state.theme ? dark : light);
    appliedTheme = responsiveFontSizes(appliedTheme);

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <ThemeProvider theme={appliedTheme}>
        <Paper>
          {!this.state.isLogin && !localStorage.getItem("loginName") ? (
            <Login onLogin={this.onLogin} />
          ) : (
            <div className={classes.root}>
              <CssBaseline />
              <AppBar
                position="fixed"
                className={classes.appBar}
                fooJon={classNames(classes.appBar, {
                  [classes.appBarShift]: this.state.open,
                })}
              >
                <Toolbar disableGutters={true}>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classes.menuButton}
                  >
                    <MenuIcon
                      classes={{
                        root: this.state.open
                          ? classes.menuButtonIconOpen
                          : classes.menuButtonIconClosed,
                      }}
                    />
                  </IconButton>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.grow}
                    noWrap
                  >
                    <img
                      alt="trifecta"
                      src={logo}
                      style={{ width: "74px", height: "55px" }}
                    />
                    <br />
                    Trifecta HMS
                  </Typography>
                  <div>
                    <IconButton color="inherit" onClick={()=>this.setState({isToDoPop:true})}>
                      <Badge badgeContent={this.state.TotalToDo} color="primary">
                        <AssignmentTurnedInTwoToneIcon />
                      </Badge>
                    </IconButton>

                    <IconButton
                      aria-owns={open ? "menu-appbar" : undefined}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AppsIcon />
                    </IconButton>
                    {/* </Badge> */}

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Account</MenuItem>
                      <MenuItem onClick={this.handleClose}>Features</MenuItem>
                      <MenuItem onClick={this.handleClose}>History</MenuItem>
                      <MenuItem onClick={this.handleClose}>Support</MenuItem>
                      <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
                    </Menu>

                    <IconButton
                      aria-owns={open ? "menu-appbar" : undefined}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <Badge badgeContent={2} color="primary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Account</MenuItem>
                      <MenuItem onClick={this.handleClose}>Features</MenuItem>
                    </Menu>

                    <IconButton
                      edge="end"
                      color="inherit"
                      aria-label="mode"
                      onClick={() =>
                        this.setState({
                          isFullScreen: !this.state.isFullScreen,
                        })
                      }
                    >
                      <FullscreenIcon />
                    </IconButton>

                    <IconButton
                      edge="end"
                      color="inherit"
                      aria-label="mode"
                      onClick={() =>
                        this.setState({ theme: !this.state.theme })
                      }
                    >
                      {icon}
                    </IconButton>

                    <IconButton
                      aria-owns={open ? "menu-appbar" : undefined}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <small className="mr-2" style={{ fontSize: "13px" }}>
                        Hey! {localStorage.getItem("loginName")}
                      </small>
                      <Avatar>
                        {localStorage.getItem("loginName").substring(0, 1)}
                      </Avatar>
                    </IconButton>

                    <IconButton
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => this.signOut()}
                    >
                      <ExitToAppIcon style={{ color: "red" }} />
                    </IconButton>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Account</MenuItem>
                      <MenuItem onClick={this.handleClose}>Features</MenuItem>
                      <MenuItem onClick={this.handleClose}>History</MenuItem>
                      <MenuItem onClick={this.handleClose}>Support</MenuItem>
                      <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>

              <Router basename="/">
                <Drawer
                  variant="permanent"
                  className={classNames(classes.drawer, {
                    [classes.drawerOpen]: this.state.open,
                    [classes.drawerClose]: !this.state.open,
                  })}
                  classes={{
                    paper: classNames({
                      [classes.drawerOpen]: this.state.open,
                      [classes.drawerClose]: !this.state.open,
                    }),
                  }}
                  open={this.state.open}
                >
                  <div className={classes.toolbar} />
                  <Navbar />
                </Drawer>
                <main className="main-body-section" className={classes.content}>
                  <div className={classes.toolbar} />
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/User">
                    <PeopleNav />
                  </Route>
                  {/* <Route path="/Admin">
                    <Admin />
                  </Route> */}
                  <Route path="/SubAdmin">
                    <SubAdminNav />
                  </Route>
                  <Route path="/RoomManagement">
                    <RoomManagementNav />
                  </Route>
                  <Route path="/Reservation">
                    <ReservationNav />
                  </Route>
                  <Route path="/FrontOffice">
                    <FrontOfficeNav />
                  </Route>
                  <Route path="/Configuration">
                    <ConfigurationNav />
                  </Route>
                </main>
              </Router>
            </div>
          )}
          <Footer />
        </Paper>
        {
          this.state.isToDoPop?<ToDo closeToDoPop={this.closeToDoPop}/> :null 
        }
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);

export const light = {
  palette: {
    type: "light",
  },
};

export const dark = {
  palette: {
    type: "dark",
  },
};
