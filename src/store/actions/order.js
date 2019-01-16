// actionCreator

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};


export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};


export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        let url = 'http://localhost:3001/orders';
        axios.post(url, orderData)
           .then(response => {
              dispatch(purchaseBurgerSuccess( response.data.name, orderData));
           })
           .catch(error => {
              dispatch( purchaseBurgerFail( error ) );
           });
    };
};


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};


export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        let url = 'http://localhost:3001/orders/'
        axios.get(url + userId)
             .then( res => {
                  const fetchedOrders = [];
                  for (let key in res.data){
                      fetchedOrders.push({
                          ...res.data[key],
                          id: key
                        });
                  }
                  dispatch(fetchOrdersSuccess(fetchedOrders));
             })
             .catch(err => {
                 dispatch(fetchOrderFail(err));
             });
    };
};