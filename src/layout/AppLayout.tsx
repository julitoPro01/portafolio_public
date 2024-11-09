import { Children, cloneElement, isValidElement, MouseEvent, ReactElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import { LockScreen, AnimationFillterTheme, AnimationLetters, type_uidElement, AnimationBallShadowBody } from "../components";
import { ThemeContext } from "../context/UserThemeContext";
import { className_theme } from "../style/className";

const { icon__changeTheme__light,
    icon__changeTheme__night,
    content__animationTheme_light
} = className_theme;

export const AppLayout = ({ children }: any) => {

    const [style_prop, setstyle_prop] = useState({
        x: 0, y: 0
    });

    const nodeLayout = useRef<HTMLDivElement>(null);

    const nodeFilter = useRef<HTMLDivElement>(null);

    const nodeAppMainRef = useRef<HTMLDivElement>(null);

    const { state, dispatch_ThemeLight, dispatch_ThemeNight,dispatch_ThemeAnimationStart,
        dispatch_ScreenLock
    }
        = useContext(ThemeContext);


    const handleMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        setstyle_prop(val => ({ ...val, x: clientX, y: clientY }));
    }

    const handleChangeTheme = () => {

        if(state.isThemeBlack){
            dispatch_ThemeLight();
        }
        else{
            dispatch_ThemeNight();
        }

    }

    const handleScreenLock = () => {
        dispatch_ScreenLock(true);
        const target = nodeLayout.current as HTMLDivElement;
        const lockScreen = target.querySelector('#' + type_uidElement.lock_screen) as HTMLDivElement;
        const Screen = lockScreen.querySelector('.' + type_uidElement.lock_content) as HTMLDivElement;
        lockScreen.style.display = 'inline-flex'
        lockScreen.style.width = "100%"

        setTimeout(() => {

            Screen.style.transform = "scale(1,1)";
            Screen.style.opacity = "1";
            Screen.style.transition = `
                transform .5s linear,
                opacity .5s linear`;

        }, 60)
    };

    useEffect(() => {
      const target = nodeAppMainRef.current as HTMLDivElement;
        if(!state.isScreenLock){
            target.style.zIndex='2';
        }

        target.scrollIntoView({behavior:"smooth",block:"start"})
      
    }, [state.isScreenLock])
    

    return (
        <div className=" p-0 App-layout" >
            <div className="content-app-layout"
                onMouseMove={handleMove}
                ref={nodeLayout}
            >
                
                {/* <AnimationLetters /> */}
                {/* {
                    state.isScreenLock 
                    ? <AnimationBallShadow style_prop={style_prop} />
                    :<AnimationBallShadowBody style_prop={style_prop} />
                } */}
                    <AnimationBallShadowBody style_prop={style_prop} />

                    {/* <AnimationFillterTheme nodeFilter={nodeFilter} /> */}
                    <LockScreen />

                <div className=" content__appMain" style={{
                    opacity:state.isScreenLock ?0:1,
                } } ref={nodeAppMainRef}
                onTransitionEnd={(e)=>{
                    const target = e.target as HTMLDivElement;
                    if(!state.isScreenLock){
                        target.style.zIndex='2';
                    }else{
                        target.style.zIndex='-1';
                    }
                }}
                >
                    {
                        Children.map(children,(child)=>(
                            isValidElement(child)
                            ?cloneElement(child as ReactElement,{nodeAppMainRef})
                            :child
                            
                        ))
                    }
                
                </div>
            </div>
            {/* LIGHT */}
            <div className="content-theme-background" >
                <button className="btn rounded-circle me-2 mt-2"

                    title="cambiar tema"
                    onClick={handleChangeTheme}
                >

                    {
                        state.isThemeBlack
                            ? <i className={`bi bi-moon-stars-fill ${icon__changeTheme__night}`}
                            ></i>
                            : <i className={`bi bi-sun-fill ${icon__changeTheme__light}`} >
                            </i>
                    }

                </button>

                {
                    !state.isScreenLock &&
                    <button className="btn rounded-circle me-2 mt-2"
                        onClick={handleScreenLock}
                    >
                        <i className="bi bi-lock-fill"></i>
                    </button>
                }
            </div>
        </div>
    )
}
