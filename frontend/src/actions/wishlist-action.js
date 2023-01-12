
export const WishCounterActionType = {
    SET_COUNT: 'SET_COUNT'
}

export const setWishCounterAction = (wishcounter) =>{
    return (dispatch) => {
        return dispatch ({
            type: WishCounterActionType.SET_COUNT,
            payload: {
                wishcounter: wishcounter
            }
        })
    }
}
