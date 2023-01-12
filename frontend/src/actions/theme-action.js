import {themeLight,themeDark} from '../utility/theme';

export const ThemeActionTypes = {
    LIGHT_THEME: 'LIGHT_THEME',
    DARK_THEME: 'DARK_THEME'
}

export const lightThemeActionType = () => {
      return (dispatch) => {
        return dispatch ({
            type: ThemeActionTypes.LIGHT_THEME,
            payload: {
                themeLight: themeLight
            }
        })
    }
};

export const darkThemeActionType = () => {
    return (dispatch) => {
        return dispatch ({
            type: ThemeActionTypes.DARK_THEME,
            payload: {
                themeDark: themeDark
            }
        })
    }
};

