import { createContext, useReducer } from 'react';
import { iUserDataState, ContextPropData, StateDataSkills, StateDataDevSkills, StateDataProject, StateCord_of_proyect } from './UserDataType';
import { userTodoReducer_data } from './UserTodoReducer_data';


const Initialization:iUserDataState={
    stateSkills:[],
    stateDevSills:[],
    stateProject:[],
    stateCordOfProyect:{top:0,left:0,height:0,width:0,id:'',open:false,item:0}
}

export const DataContext=createContext({} as ContextPropData);


export const UserDataContext=({children}:{children:any})=>{

    const [state, dispatch] = useReducer(userTodoReducer_data, Initialization)

    const dispatch_getSkills=(data:StateDataSkills[])=>{
        
        dispatch({
            type:"[skills]",
            payload:{
                ...state,
                stateSkills:data
            }
        })
    }

    const dispatch_getDevSkills=(data:StateDataDevSkills[])=>{
        dispatch({
            type:"[dev skills]",
            payload:{
                ...state,
                stateDevSills:data
            }
        })
    }

    const dispatch_getProject=(data:StateDataProject[])=>{
        dispatch({
            type:"[project]",
            payload:{
                ...state,
                stateProject:data
            }
        })
    }

    const dispatch_setCord_ofProyect=(cord:StateCord_of_proyect)=>{
        dispatch({
            type:"[setCordOfProyect]",
            payload:{
                ...state,
                stateCordOfProyect:cord
            }
        })
    }


    return(
        <DataContext.Provider value={{
            state,
            dispatch_getSkills,
            dispatch_getDevSkills,
            dispatch_getProject,
            dispatch_setCord_ofProyect
        }} >
            {children}
        </DataContext.Provider>
    )
}
