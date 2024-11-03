import { RefObject, useContext, useLayoutEffect } from "react"
import { ThemeContext } from "../context/UserThemeContext"

export const AnimationFillterTheme = ({ nodeFilter }: { nodeFilter: RefObject<HTMLDivElement> }) => {

    const { dispatch_ThemeAnimationEnd,
         dispatch_ThemeNight, state } = useContext(ThemeContext);

    const handleEnd = () => {

        dispatch_ThemeAnimationEnd()

        if (state.isAnimationStart){
            dispatch_ThemeNight();
            dispatch_ThemeAnimationEnd()
        }
    }

  
    useLayoutEffect(() => {
        const target = nodeFilter.current as HTMLDivElement;
      
    if(state.isThemeBlack){
        target.style.visibility='hidden'
    }
    
    }, [state.isThemeBlack]);


    return (
        <div className={`content__animationTheme`}
            ref={nodeFilter}
            onTransitionEnd={handleEnd}
            >

        </div>
    )
}
