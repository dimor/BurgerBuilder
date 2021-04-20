import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css';

const logo = (props) => {


    let LogoClasses = [classes.Logo];
    
  
   

    if(props.animate){
        LogoClasses.push(classes.Animate)
    }

 
    return (<div className={LogoClasses.join(' ')} style={{ height: props.height }} >
        <img src={burgerLogo} alt='logo' />
    </div>
    )
};
export default logo;