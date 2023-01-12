
export const CartCounterActionType = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    ADD_QUANTITY: 'ADD_QUANTITY',
    SUBTRACT_QUANTITY: 'SUBTRACT_QUANTITY',
    EMPTY_CART: 'EMPTY_CART',
}

export const addToCartAction = (id) =>{
    return (dispatch) => {
        return dispatch ({
            type: CartCounterActionType.ADD_TO_CART,
            payload: {
                _id: id
            }
        })
    }
}

export const removeFromCartAction = (id) =>{
    return (dispatch) => {
        return dispatch ({
            type: CartCounterActionType.REMOVE_FROM_CART,
            payload: {
                _id: id
            }
        })
    }
}

export const addQuantityAction = (id) =>{
    return (dispatch) => {
        return dispatch ({
            type: CartCounterActionType.ADD_QUANTITY,
            payload: {
                _id: id
            }
        })
    }
}

export const subtractQuantityAction = (id) =>{
    return (dispatch) => {
        return dispatch ({
            type: CartCounterActionType.SUBTRACT_QUANTITY,
            payload: {
                _id: id
            }
        })
    }
}

export const emptyCartAction = () =>{
    return (dispatch) => {
        return dispatch ({
            type: CartCounterActionType.EMPTY_CART   
        })
    }
}





