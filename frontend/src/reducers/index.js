import { combineReducers} from 'redux';
import { SearchReducer } from './search-reducer';
import { CartCounterReducer } from './cartcounter-reducer';
import { WishCounterReducer } from './wishlist-reducer';
import { ThemeReducer } from './theme-reducer';
import { UserReducer } from './user-reducer';

export const Rootreducer = combineReducers({
    search: SearchReducer,
    cart: CartCounterReducer,
    wishlist: WishCounterReducer,
    theme : ThemeReducer,
    user: UserReducer
}); 



