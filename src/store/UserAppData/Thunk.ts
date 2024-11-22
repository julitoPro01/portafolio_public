import { StateDataSkills } from "../../context/UserDataType";
import { getSkills_db } from "../dbProvider"


export const getSkills_async=async()=>{
    const resp=await getSkills_db();

    console.log(resp)
}