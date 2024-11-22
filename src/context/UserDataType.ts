

export type UserDataType="[skills]";

export interface StateDataSkills{
    name:string,color:string,percentage:number
}

export interface iUserDataState{
   stateSkills:StateDataSkills[]
}

export interface InitializationType{
    type:UserDataType,
    payload:iUserDataState
}


/////// CONTEXT

export interface ContextPropData{
    state:iUserDataState,
    dispatch_getSkills:(state:StateDataSkills[])=>void
}