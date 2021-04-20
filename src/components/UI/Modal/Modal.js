import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';


const Modal =props=>{
   
    let styles = props.show? classes.Open:classes.Close

        return(    
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.cancelHandler} />
            <div
                className={`${classes.Modal} ${styles} `}>
                {props.children}
            </div>
        </React.Fragment>);
}
export default React.memo(Modal,(prevProps,nextProps)=>
    nextProps.show === prevProps.show && nextProps.children === prevProps.children
);