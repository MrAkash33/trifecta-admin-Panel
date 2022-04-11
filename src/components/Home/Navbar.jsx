import React from "react";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import {Box} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import MeetingRoomTwoToneIcon from "@material-ui/icons/MeetingRoomTwoTone";
import EventSeatTwoToneIcon from "@material-ui/icons/EventSeatTwoTone";
import BusinessTwoToneIcon from "@material-ui/icons/BusinessTwoTone";
import PermDataSettingTwoToneIcon from "@material-ui/icons/PermDataSettingTwoTone";
import ReceiptTwoToneIcon from "@material-ui/icons/ReceiptTwoTone";
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Box className="menu-section-left">
        <List>
            <br/><br/><br/>
          <ListItem button key="Home" className="active">
            <Link to="/">
              <ListItemIcon>
                <HomeTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
        </List>
        <Divider />
        {/* <List>
          <ListItem button key="Super Admin">
            <Link to="/Admin">
              <ListItemIcon>
                <PersonAddTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Super Admin" />
            </Link>
          </ListItem>
        </List>
        <Divider /> */}
        <List>
          <ListItem button key="SubAdmin">
            <Link to="/SubAdmin">
              <ListItemIcon>
                <PersonAddTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="People">
            <Link to="/User">
              <ListItemIcon>
                <PeopleOutlineTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="People" />
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Room Management">
            <Link to="/RoomManagement">
              <ListItemIcon>
                <MeetingRoomTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Room Management" />
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Reservation">
            <Link to="/Reservation">
              <ListItemIcon>
                <EventSeatTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Reservation" />
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Front Office">
            <Link to="/FrontOffice">
              <ListItemIcon>
                <BusinessTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Front Office" />
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Configuration">
            <Link to="/Configuration">
              <ListItemIcon>
                <PermDataSettingTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Configuration" />
            </Link>
          </ListItem>
        </List>
      </Box>
    );
  }
}
