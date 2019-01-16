import React from 'react';

import classes from './Input.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        //define each case in the "enter your contact data" box (eg:Your Name, Street, ZIP code, Country,...) in checkout/contact-data
        case ('input'):  // all cases except deliver method (fastest or cheapest)
            inputElement = <input 
                 className={inputClasses.join(' ')} 
                 {...props.elementConfig}
                 value={props.value}
                 onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                 className={inputClasses.join(' ')} 
                 {...props.elementConfig}
                 value={props.value}
                 onChange={props.changed}/>;
            break;
        case ('select'): //deliver method (fastest or cheapest)
            inputElement = (
                <select
                    className={inputClasses.join(' ')} 
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}    
                </select>  
            );
            break;
        default:
            inputElement = <input 
                 className={inputClasses.join(' ')} 
                 {...props.elementConfig}
                 value={props.value}
                 onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;