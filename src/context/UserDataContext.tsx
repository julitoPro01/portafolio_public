import { createContext, useReducer } from 'react';
import { iUserDataState, ContextPropData, StateDataSkills } from './UserDataType';
import { userTodoReducer_data } from './UserTodoReducer_data';


const Initialization:iUserDataState={
    stateSkills:[]
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

    return(
        <DataContext.Provider value={{
            state,
            dispatch_getSkills
        }} >
            {children}
        </DataContext.Provider>
    )
}
