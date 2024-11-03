import {TypesThemes } from "./UserType"

interface PropsIcon{
    type:TypesThemes,
}

export const UseTodoReducerTheme = () => {
    const changeThemeLight=({type}:PropsIcon)=>{
         
         return   {type
        }
    }

    const changeThemeNight=({type}:PropsIcon)=>{
        
        return    {type,
        }   
    }

    return{
        changeThemeLight,
        changeThemeNight
    }
}
