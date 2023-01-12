import { WishCounterActionType } from "../actions/wishlist-action"

export const WishCounterReducer  = (state = {
    wishcounter: 0
},action) =>{
    
    switch(action.type){
        case WishCounterActionType.SET_COUNT:
            let update_count = {
                ...state
                
            }
            return update_count;
 
        default: 
            return{
                ...state
            }    
    }
    // return{
    //     ...state
    // }
}

