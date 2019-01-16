import React from 'react';

import classes from './Backdrop.css'

// backdrop component will be placed in Modal component
const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;