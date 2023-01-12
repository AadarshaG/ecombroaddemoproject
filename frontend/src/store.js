import {applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import { Rootreducer } from "./reducers/index";
import { themeLight } from "./utility/theme";

const middlewares = [thunk];

const defaultStore = {
    search: {
        keyword: '',
        searchResult: []
    },
    cart:{
        addToCart: '',
        removeFromCart: '',
        addQuantity: '',
        subtractQuantity: '',
        emptyCart: '',
    },
    wishlist:{
        wishcounter: 0
    },
    theme:{
        theme: themeLight,
        darkTheme: true,
    },
    user:{
        user: [],
        loading: false,
        error: ''
    }
};

export const store = createStore(Rootreducer, defaultStore,applyMiddleware(...middlewares));
