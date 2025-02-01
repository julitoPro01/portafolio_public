import { collection, getDocs } from "firebase/firestore/lite";
import { fireBaseDb } from "./fireBase";
import { StateDataDevSkills, StateDataProject, StateDataSkills } from "../context/UserDataType";

export const getSkills_db= async():Promise<StateDataSkills[]>=>{
    try{

        const collect = collection(fireBaseDb,"skills");
        const skillSnapshot = await getDocs(collect);
        const data:StateDataSkills[] = skillSnapshot.docs.map(values=>values.data() as StateDataSkills);
        
        return data;
    }catch(e){
        return [];
    }
};


export const getDevSkills_db= async():Promise<StateDataDevSkills[]>=>{
    try{

        const collect = collection(fireBaseDb,"dev skill");
        const skillSnapshot = await getDocs(collect);
        const data:StateDataDevSkills[] = skillSnapshot.docs.map(values=>values.data() as StateDataDevSkills);
        
        return data;
    }catch(e){
        return [];
    }
};


export const getProject_db= async():Promise<StateDataProject[]>=>{
    try{

        const collect = collection(fireBaseDb,"projects");
        const skillSnapshot = await getDocs(collect);
        const data:StateDataProject[] = skillSnapshot.docs.map(values=>values.data() as StateDataProject);
        
        return data;
    }catch(e){
        return [];
    }
};
