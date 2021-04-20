import React ,{useState} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';



const Layout = props=>{


    const [sideDrawer,setSideDrawer] = useState(false);


    const sideDrawerClosedHandler=()=>{

        setSideDrawer(false);

    }

    const sideDrawerToggleHandler=()=>{

     setSideDrawer((preSideDrawer)=>(!preSideDrawer))

    }


        return (
            <React.Fragment>
                <Toolbar 
                 isAuth={props.isAuthenticated}
                 clicked={sideDrawerToggleHandler} />
                <SideDrawer
                     isAuth={props.isAuthenticated} 
                 open={sideDrawer} closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}

                </main>
            </React.Fragment>
        );


}


const mapStateToProps = state =>{
    return{
        isAuthenticated : state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);