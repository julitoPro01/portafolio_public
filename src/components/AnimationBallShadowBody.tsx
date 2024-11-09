import { memo, MouseEvent, TransitionEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ThemeContext } from "../context/UserThemeContext";
import img_wallpaper from '../assets/fondodepantalla03.png';


interface Props {
    style_prop: { x: number, y: number }
}

export const AnimationBallShadowBody = memo(({ style_prop }: Props) => {

    const contentBallRed = useRef<HTMLDivElement>(null);

    const { state } = useContext(ThemeContext);
    const [numLight, setnumLight] = useState({ num: 0.8, stopNum: 0})

    const wallpaper = useMemo(() => contentBallRed.current?.querySelector('.wallpaper') as HTMLDivElement,
        [contentBallRed.current]);

    const capa_wallpaper = useMemo(() => contentBallRed.current?.querySelector('.capa_wallpaper') as HTMLDivElement,
        [contentBallRed.current]);


    const handleMoveCircle = (target: HTMLDivElement, wallpaper: string, light: number,ballLight:number) => {
        target.style.backgroundImage = `
        radial-gradient(
        circle at ${style_prop.x}px ${style_prop.y}px ,
        rgba(255, 255, 255, 0.145) 25px, rgba(0, 0, 0, ${light}) 50px
         ), url(${wallpaper})`
    }

    const updateNumLight = (signo: -1 | 1): number => {
        return setInterval(() => {
            setnumLight((val) => ({ ...val, num: (val.num += (0.2 * signo)) }))
        }, 60)

    }

    const setStaticNumLight = (num: 0.0 | 0.8, stopNum: number) => {
        setnumLight(val => ({ ...val, num, stopNum: 0 }))
        clearInterval(stopNum)
    }

    // ----MOVE THE CIRCLE
    useEffect(() => {
        const target = wallpaper as HTMLDivElement;
        if (!target) return;
        if (!state.isThemeBlack) return;
        handleMoveCircle(target, img_wallpaper, numLight.num,0.145)
    }, [style_prop])

    //----SET THE THEME (LIGHT | NIGHT)
    useEffect(() => {
        let clear;
        if (!wallpaper) return;
        
        if (state.isThemeBlack) {
            if (clear) clearInterval(clear);
            clear = updateNumLight(+1);

        } else {
            if (clear) clearInterval(clear);
            clear = updateNumLight(-1);
        }

        setnumLight(val => ({ ...val, stopNum: clear }));

        return () => {
            if (clear) clearInterval(clear)
        }

    }, [state.isThemeBlack,]);

    //DOTO::
    // useEffect(() => {
    //     let clear;
    //     if (!wallpaper) return;

    //     if (state.isThemeBlack) {
    //         if (clear) clearInterval(clear);
    //         clear = updateNumLight(+1);

    //     } else {
    //         if (clear) clearInterval(clear);
    //         clear = updateNumLight(-1);
    //     }

    //     if(!state.isThemeBlack && !state.controlAnimation_letters.project && !state.isScreenLock ){
    //         if (clear) clearInterval(clear);
    //         clear = updateNumLight(+1);
    //     }else if(!state.isThemeBlack && state.controlAnimation_letters.project && !state.isScreenLock ){
    //         if (clear) clearInterval(clear);
    //         clear = updateNumLight(-1);
    //     }

    //     setnumLight(val => ({ ...val, stopNum: clear }));

    //     return () => {
    //         if (clear) clearInterval(clear)
    //     }

    // }, [state.isThemeBlack,state.controlAnimation_letters.project]);

    //----UPDATE THE NUM THEME 
    useEffect(() => {
        if (!wallpaper) return;
        if (numLight.num < 0.0)
            setStaticNumLight(0.0, numLight.stopNum)
        if (numLight.num > 0.8)
            setStaticNumLight(0.8, numLight.stopNum)

        if(state.isThemeBlack  ){

            handleMoveCircle(wallpaper, img_wallpaper, numLight.num,0.145)
        }
        else{
            handleMoveCircle(wallpaper, img_wallpaper, numLight.num,0)
        }
    }, [numLight.num])

    useEffect(() => {

        if (!wallpaper) return;
        if (state.isScreenLock) {
            wallpaper.style.filter = `invert(0) grayscale(${1})`;
            capa_wallpaper.style.display='none'
        } else {
            wallpaper.style.filter = `invert(0) grayscale(${0})`;
            capa_wallpaper.style.display='block'
            // wallpaper.style.mixBlendMode="multiply";
        }

    }, [state.isScreenLock])

    useEffect(() => {

        if(!capa_wallpaper) return;
        if(!state.controlAnimation_letters.project){
        //    capa_wallpaper.style.backgroundColor="rgb(14, 34, 60)";
        }else{

           capa_wallpaper.style.backgroundColor="rgba(14,34,60,0)";
   
        }
      
    }, [state.controlAnimation_letters.project])
    

    // useEffect(() => {
    //   let clear:number=0;
    //   if(state.isScreenLock) return
    //   if(!wallpaper) return;

    //   if(!state.controlAnimation_letters.project){
    //       if(!state.isThemeBlack){
    //           if (clear !=0) clearInterval(clear);
    //         //   clear = updateNumLight(+1);
    //         }
    //     console.log('project')
    //     handleMoveCircle(wallpaper, img_wallpaper, 0.8,0)
           
    //         // wallpaper.style.filter = `invert(0) grayscale(${1})`;
    //         console.log(state.isThemeBlack)
    //         setnumLight(val => ({ ...val, stopNum: clear }));
    //     }
        
    //     return () => {
    //         if (clear !=0) clearInterval(clear)
    //     }
    // }, [state.controlAnimation_letters.project])
    


    return (
        <div className={`animation_ball_shadow`}
            style={{ opacity: 1 }}
            ref={contentBallRed}

        >
            <div className="wallpaper" >

            </div>
            <div className="capa_wallpaper" >

            </div>
        </div>
    )
})



