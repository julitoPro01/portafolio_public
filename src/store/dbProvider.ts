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

export const getProfile_db =async():Promise<String | null  | undefined>=>{
    try{
        let img;
        const collect = collection(fireBaseDb,"profile");
        const profileSnapshot = await getDocs(collect);
        profileSnapshot.docs.forEach(values=>{
            img = values.data().img;
        })
        return img;
    }catch{
        return null;
    }
}

export const getHome_db =async():Promise<String | null  | undefined>=>{
    try{
        let txt;
        const collect = collection(fireBaseDb,"home");
        const profileSnapshot = await getDocs(collect);
        profileSnapshot.docs.forEach(values=>{
            txt = values.data().presentation;
        })
        return txt;
    }catch{
        return null;
    }
}