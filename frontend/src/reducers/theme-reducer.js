import { ThemeActionTypes } from "../actions/theme-action";
import { themeLight } from "../utility/theme";

const initialState = {
    theme: themeLight,
    darkTheme: true,
  };

export const ThemeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ThemeActionTypes.LIGHT_THEME:
        return {
            ...state,
            theme: action.payload.themeLight,
            darkTheme: false,
        };

        case ThemeActionTypes.DARK_THEME:
        return {
            ...state,
            theme: action.payload.themeLight,
            darkTheme: true,
        };
        
        default:
        return state;
    }
};