import { InitializationType, iUserDataState } from './UserDataType';



export const userTodoReducer_data=(state:iUserDataState,action:InitializationType):iUserDataState=>{
    switch(action.type){
            case "[skills]":
                return{
                    ...state,
                    stateSkills:action.payload.stateSkills
                };
            default: return state
    }
}