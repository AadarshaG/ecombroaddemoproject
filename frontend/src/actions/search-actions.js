import { HttpClient } from '../utility/httpclient';

export const SearchActionTypes = {
    SET_KEYWORD: 'SET_KEYWORD',
    FETCH_RESULT: 'FETCH_RESULT'
}

export const setKeywordAction = (keyword) =>{
    return (dispatch) => {
        return dispatch ({
            type: SearchActionTypes.SET_KEYWORD,
            payload: {
                keyword: keyword
            }
        })
    }
}



export const  setResult = (keyword) => dispatch => {
    {
       let search_result = []; 
   // console.log('Keyword',keyword);
        let http = new HttpClient();
        http.getItem('/product?keyword='+keyword,true)
        .then((response)=>{
            return {
                type: SearchActionTypes.FETCH_RESULT,
                payload: response.data.data
            }
        
        })
        .catch((error)=>{
            return dispatch ({
                type: SearchActionTypes.FETCH_RESULT,
                payload: []
    
            })
        })
    }
}