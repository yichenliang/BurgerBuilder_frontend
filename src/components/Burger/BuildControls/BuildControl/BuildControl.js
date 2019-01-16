import React from 'react';

import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
             className={classes.Less} 
             onClick={props.removed} 
             //use css to control the disable of button (.BuildControl button:disabled)
             disabled={props.disabled}>Less</button>
        <button 
             className={classes.More} 
             onClick={props.added}>More</button>
    </div>
);

export default buildControl;