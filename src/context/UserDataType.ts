

export type UserDataType="[skills]"|"[dev skills]"|"[project]"
                        | "[setCordOfProyect]";

export interface StateDataSkills{
    name:string,color:string,percentage:number
}

export interface StateCord_of_proyect{
    top:number,
    left:number,
    height:number,width:number,
    id:string,
    open:boolean,
    item:number
}

export interface StateDataDevSkills{
    name:string,
    description:string,
    icon:string,
    subname:string
}

export interface StateDataProject{
    name:string,
    description:string,
    details:string,
    id:number,
    img:string,
    info:string,
    urlgit:string,
    urlweb:string
}

export interface iUserDataState{
   stateSkills:StateDataSkills[],
    stateDevSills:StateDataDevSkills[],
    stateProject:StateDataProject[],
    stateCordOfProyect:StateCord_of_proyect
}

export interface InitializationType{
    type:UserDataType,
    payload:iUserDataState
}


/////// CONTEXT

export interface ContextPropData{
    state:iUserDataState,
    dispatch_getSkills:(state:StateDataSkills[])=>void,
    dispatch_getDevSkills:(state:StateDataDevSkills[])=>void,
    dispatch_getProject:(state:StateDataProject[])=>void,
    dispatch_setCord_ofProyect:(state:StateCord_of_proyect)=>void
}