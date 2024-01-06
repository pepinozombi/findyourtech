import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { MenuButton } from 'react-bootstrap-icons';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ArrowsMove } from 'react-bootstrap-icons';
import { Mailbox } from 'react-bootstrap-icons';
import { People } from 'react-bootstrap-icons';
import { ArrowsCollapse, ArrowsExpand, Star } from 'react-bootstrap-icons';
import { Navbar, Image } from "react-bootstrap";

const SidebarMenu = () => {
  const [open, setOpen] = useState(false);
  const [openCommunity, setOpenCommunity] = useState(false);

  const handleClickCommunity = () => {
    setOpenCommunity(!openCommunity);
  };

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  const list = (anchor = 'left') => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <ListItem>
          <ListItemIcon>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(false)}
            >
              <MenuButton />
            </IconButton>
          </ListItemIcon>
          <Navbar.Brand href="/">
            <Image src="https://www.svgrepo.com/show/478565/bible-2.svg" alt="" width="30" height="24" class="d-inline-block align-text-top" style={{marginRight: "5px"}}/>
            FGCodex
          </Navbar.Brand>
        </ListItem>
      <List>
        
        
        <ListItem  disablePadding>
          
          <ListItemButton href="/">
            <ListItemIcon>
              <Mailbox />
            </ListItemIcon>
            <ListItemText primary={"Clips"} />
          </ListItemButton>
        </ListItem>
        <ListItem  disablePadding>
          <ListItemButton href="/lists/">
            <ListItemIcon>
              <Mailbox />
            </ListItemIcon>
            <ListItemText primary={"Lists"} />
          </ListItemButton>
        </ListItem>
        <ListItem  disablePadding>
          <ListItemButton href="/guides/">
            <ListItemIcon>
              <Mailbox />
            </ListItemIcon>
            <ListItemText primary={"Guides"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <ArrowsMove /> : <Mailbox />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton onClick={handleClickCommunity}>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Community" />
        {openCommunity ? <ArrowsCollapse /> : <ArrowsExpand />}
        </ListItemButton>
        <Collapse in={openCommunity} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuButton />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
           {list()}
      </Drawer>
    </div>
  );
};

export default SidebarMenu;
