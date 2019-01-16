import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    // use three nested <div> because DrawerToggle.css has DrawerToggle div style
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div> 
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;