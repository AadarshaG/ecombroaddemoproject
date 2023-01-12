import { CartCounterActionType } from "../actions/cartcounter-action";

const initialState = {
    cart: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

export const CartCounterReducer  = (state = initialState, action) => {
    
    switch(action.type){
        case CartCounterActionType.ADD_TO_CART:
            let add_cart = {
                ...state,
                cart: state.cart.map((product) =>
                    product.id === action.payload._id ? {...product, selected: true} : product ),    
            }
            return add_cart;
            // return {
            //     ...state
            //     const itemIndex = state.cart.findIndex((item) =>  item.id === action.payload._id)
            //     if(itemIndex >= 0){
            //             state.cart[itemIndex].cartTotalQuantity += 1
            //     }else{
            //         const temp = (...action.payload, cartTotalQuantity: 1)
            //         state.cart.push(temp)
            //     }
            // }
           
            // return {
            //     ...state,
            //     cart: state.cart.map((product) =>
            //         product.id === action.id ? {...product, selected: true} : product,
            //     ),
            // }

        case CartCounterActionType.REMOVE_FROM_CART:
            let remove_cart = {
                ...state,
                cart: state.cart.map((product) =>
                    product.id === action.payload._id  ? {...product, selected: false, quantity : 1} : product ),
            }
            return remove_cart;

        case CartCounterActionType.ADD_QUANTITY:
            let add_quantity = {
                ...state,
                cart: state.cart.map((product) =>
                    product.id === action.payload._id  ? {...product,  quantity: product.quantity+1,}  : product ),
            }
            return add_quantity;

        case CartCounterActionType.SUBTRACT_QUANTITY:
            let subtract_quantity = {
                ...state,
                cart: state.cart.map((product) =>
                    product.id === action.payload._id  ? {...product,  quantity: product.quantity !== 1 ? product.quantity - 1 : 1,}  : product ),
            }
            return subtract_quantity;

        case CartCounterActionType.EMPTY_CART:
            let empty_cart = {
                ...state,
                cart: state.cart.map((product) =>
                    product.selected ? {...product, selected: false, quantity: 1} : product ),
            }
            return empty_cart;

        default: 
            return{
                ...state
            }    
    }
}



