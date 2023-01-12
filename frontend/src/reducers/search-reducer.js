import { SearchActionTypes } from "../actions/search-actions"

export const SearchReducer  = (state = {
    keyword: '',
    searchResult: []
},action) =>{
    //console.log('Search Result', action);
    switch(action.type){
        case SearchActionTypes.SET_KEYWORD:
            let update_store = {
                ...state,
                ...action.payload
            }
            return update_store;

        case SearchActionTypes.FETCH_RESULT:
            let update_stores =  {
                ...state,
                searchResult: action.payload
            }
            return  update_stores;   
        default: 
            return{
                ...state
            }    
    }
}







