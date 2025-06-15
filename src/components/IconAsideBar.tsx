import { useContext } from "react";
import { ThemeContext } from "../context/UserThemeContext";

export interface Items {
    href: string,
    title: string
    icon: string
}


interface IconsProps {
    value: Items, i: number
}

export const IconAsideBar = ({ Props}: { Props: IconsProps}) => {

    const { value } = Props;
    const {state} = useContext(ThemeContext);


    const link = state.controlAnimation_letters as any;
   const handleChengePage =()=>{
       window.location.replace(window.location.origin+`/#${value.href}`);
        // window.location.href = window.location.origin+`/#${value.href}`
   }    



    return (
        
        <li >
            <div className="" data-href={`#${value.href}`}
                onClick={handleChengePage}
                    >
                
                <p className={`${ !link[value.href] && "_active"}`} > { "< "+value.title+" />"} </p>
            </div>

        </li>
    )
}

