import { collection, getDocs } from "firebase/firestore/lite";
import { fireBaseDb } from "./fireBase";
import { StateDataSkills } from "../context/UserDataType";

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