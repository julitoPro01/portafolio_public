import { InitializationType, iUserDataState } from './UserDataType';



export const userTodoReducer_data=(state:iUserDataState,action:InitializationType):iUserDataState=>{
    switch(action.type){
            case "[skills]":
                return{
                    ...state,
                    stateSkills:action.payload.stateSkills
                };
            case "[dev skills]":
                return{
                    ...state,
                    stateDevSills:action.payload.stateDevSills
                };
            case "[project]":
                return{
                    ...state,
                    stateProject:action.payload.stateProject
                };

            case "[setCordOfProyect]":{
                return{
                    ...state,
                    stateCordOfProyect:action.payload.stateCordOfProyect
                }
            }
            
            default: return state
    }
}