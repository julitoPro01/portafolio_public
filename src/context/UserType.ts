

export type TypesThemes =
    "[typeTheme_Light]" |
    "[typeTheme_Night]" |
    "[typeAnimation_End]" |
    "[typeAnimation_Start]" |
    "[typeScreen_lock]"|
    "[type_animate_lettersGeneral]"|
    "[type_animate_lettersHome]"|
    "[type_animate_lettersSkill]"|
    "[type_animate_lettersEspertise]"|
    "[type_animate_lettersProject]"|
    "[type_animate_lettersContact]"

    
    export type ThemeIconColor = "white" | "black";
    export enum AniamtionChange { 'stop', 'starting' }
    
    export type ControlProperties = 'general' | 'home' | 'skill' | 'project' | 'contact' | 'expertise';
    export type PropertyLetter={general:boolean,skill:boolean,project:boolean,home:boolean,contact:boolean};

export interface PropsState{
    style_icon: {colorIcon:ThemeIconColor},
    isThemeBlack?:boolean,
    isAnimationStart:AniamtionChange,
    isScreenLock:boolean,
    controlAnimation_letters:PropertyLetter
}
export interface PropsThemeAction {
    type: TypesThemes,
    payload: PropsState
}


/////////////////CONTEXT/////////////////

export interface PropsContextTheme {
    state: PropsState,
    dispatch_ThemeLight: () => void,
    dispatch_ThemeNight: () => void,
    dispatch_ThemeAnimationEnd: () => void,
    dispatch_ThemeAnimationStart: () => void,
    dispatch_ScreenLock:(lockScreen:boolean)=>void,
    dispatch_lettersAnimateControl:(type:TypesThemes)=>void
}