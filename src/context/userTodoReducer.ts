import { ControlProperties, PropertyLetter, PropsState, PropsThemeAction } from './UserType';


export const userTodoReducer=(state:PropsState,{type,payload}:PropsThemeAction)
    :PropsState =>{
    switch (type) {
        case '[typeTheme_Light]':{
            return {
                ...state,
                isThemeBlack:false,
            }
        }
        case '[typeTheme_Night]':{
            return {
                ...state,
                isThemeBlack:true,
            }
        }
        case '[typeAnimation_End]':{
            return{
                ...state,
                isAnimationStart:0,
            }
        }
        case '[typeAnimation_Start]':{
            return {
                ...state,
                isAnimationStart:1,
            }
        }
        case '[typeScreen_lock]':{
            return{
                ...state,
                isScreenLock:payload.isScreenLock
            }
        }
        //SCREEN LETTERS
        case '[type_animate_lettersGeneral]':{
            return{
                ...state,
                controlAnimation_letters:setControl("general",false)
            }
        }
        case '[type_animate_lettersHome]':{
            return{
                ...state,
                controlAnimation_letters:setControl("home",false)
            }
        }
        case '[type_animate_lettersSkill]':{
            return{
                ...state,
                controlAnimation_letters:setControl("skill",false)
            }
        }
        case '[type_animate_lettersEspertise]':{
            return{
                ...state,
                controlAnimation_letters:setControl("expertise",false)
            }
        }
        case '[type_animate_lettersProject]':{
            return{
                ...state,
                controlAnimation_letters:setControl("project",false)
            }
        }
        case '[type_animate_lettersContact]':{
            return{
                ...state,
                controlAnimation_letters:setControl("contact",false)
            }
        }
        default: return state
            
    }
}

const setControl=(property:ControlProperties,value:boolean):PropertyLetter=>{
    const control: Record<ControlProperties, boolean> ={
        general:true,home:true,skill:true,project:true,contact:true,expertise:true
    }
    
    control[property]=value;
    
    return control;
}
