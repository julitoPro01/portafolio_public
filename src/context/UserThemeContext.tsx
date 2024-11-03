import { createContext, useReducer } from "react";
import { userTodoReducer } from "./userTodoReducer";
import { PropsContextTheme, PropsState, TypesThemes } from "./UserType";


const InitialState: PropsState = {
    style_icon: {
        colorIcon: 'black'},
    isThemeBlack:true,
    isAnimationStart:0,
    isScreenLock:true,
    controlAnimation_letters:{general:true,home:true,skill:true,project:true,contact:true}
}

export const ThemeContext = createContext({} as PropsContextTheme);


export const ThemeContextProvider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(userTodoReducer, InitialState);


    const dispatch_ThemeLight = () => {
        dispatch({type:'[typeTheme_Light]',payload:{...state}})
    }

    const dispatch_ThemeNight = () => {
        dispatch({type:'[typeTheme_Night]',payload:{...state}})
    }

    const dispatch_ThemeAnimationEnd=()=>{
        dispatch({type:'[typeAnimation_End]',payload:{...state}})
    }

    const dispatch_ThemeAnimationStart=()=>{
        dispatch({type:'[typeAnimation_Start]',payload:{...state}})
    }

    const dispatch_ScreenLock=(lockScreen:boolean)=>{
        dispatch({type:"[typeScreen_lock]",
            payload:{...state,isScreenLock:lockScreen}
        })
    }

    ///DESPACTH LETTERS SCREAM

    const dispatch_lettersAnimateControl=(type:TypesThemes)=>{
        dispatch({type,payload:{...state}})
    }

    return (
        <ThemeContext.Provider value={{
            state,
            dispatch_ThemeLight,
            dispatch_ThemeNight,
            dispatch_ThemeAnimationEnd,
            dispatch_ThemeAnimationStart,
            dispatch_ScreenLock,
            dispatch_lettersAnimateControl
        }} >
            {children}
        </ThemeContext.Provider>
    )
}