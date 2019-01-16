import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
   <ul className={classes.NavigationItems}>
       <NavigationItem link="/" exact >Burger Builder</NavigationItem>
       {/* Orders should only be visible when we are authenticated  */}
       {props.isAuthenticated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null }
       { !props.isAuthenticated
            // when it is not authenticated, we need to authenticate, when it is authenticated, give users a chance to log out 
            ? <NavigationItem link="/auth" >Authenticate</NavigationItem>
            : <NavigationItem link="/logout" >Logout</NavigationItem>}
   </ul>
);

export default navigationItems;