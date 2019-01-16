import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link} // use <NavLink/> component to create a specific URL we want, and then use <Router /> component to render to some specific pages 
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;