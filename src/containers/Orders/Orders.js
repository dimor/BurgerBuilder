import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../withErrorHander/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


const Orders = props=> {

    const {onFetchOrders,token,userId,loading} = props;

    useEffect(()=>{
        onFetchOrders(token,userId);
    },[onFetchOrders,token,userId])


        let orders = <Spinner />;

        if (!loading) {
            orders = props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            })
        }

        return (
            <div>
                {orders}
            </div>

        );
}


const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

const mapStateToProps = state => {

    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token :state.auth.token,
        userId :state.auth.userId
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));