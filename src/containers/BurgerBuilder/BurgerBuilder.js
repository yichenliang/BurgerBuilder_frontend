// use class keyword: need to manage state in this component

// BurgerBuilder = Burger + BuildControls
// Burger: the picture of builded burger
// BuildControls: Current Price + BuildControl(Salad + Bacon + Cheese + Meat) + ORDER NOW 
//                                   

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{
   
   state = {
        purchasing: false,    // determine whether the modal (the your order box) will show on screen
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    //in order to determine the availability of ORDER NOW button
    updatePurchaseState (ingredients) {
       const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => { 
                return sum + el;
            }, 0);
        return sum > 0;
   }


   purchaseHandler = () => {
       if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
       } else {
           this.props.onSetAuthRedirectPath('/checkout');
           this.props.history.push('/auth');
       }
       
   }
   
   //when click the backdrop, we want to close the modal and cancel the purchase
   purchaseCancelHandler = () => {
       this.setState({purchasing: false});
   }

   purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
   }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
        if (this.props.ings) {
            burger = (  
                <Aux>
                    <Burger ingredients = {this.props.ings}/> 
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        // control the ORDER NOW button 
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                             ingredients={this.props.ings}
                             price={this.props.price}
                             purchaseCancelled={this.purchaseCancelHandler}
                             purchaseContinued={this.purchaseContinueHandler}/>

        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

//Redux
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));