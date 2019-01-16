import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
// int order to make nav component can be reusable in other place
import NavigationItems from '../NavigationItems/NavigationItems';  
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'; 

const toolbar = (props) => (
   <header className={classes.Toolbar}>
       <DrawerToggle clicked={props.drawerToggleClicked} />
       <div className={classes.Logo}>
          <Logo />
       </div>
       <nav className={classes.DesktopOnly}> 
           <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
   </header>
);

export default toolbar;

