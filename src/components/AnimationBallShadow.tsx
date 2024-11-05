import { memo, useContext, useEffect, useLayoutEffect, useRef } from "react";

import backgroundImg from '../assets/fondodepantalla00.jpg';

import { ThemeContext } from "../context/UserThemeContext";


interface Props {
    style_prop: { x: number, y: number }
}

export const AnimationBallShadow = memo(({ style_prop }: Props) => {

    const contentBallRed = useRef<HTMLDivElement>(null);

    const { state } = useContext(ThemeContext);

    const handleMoveBlack = (backgroundImg: string, isBlack: boolean) => {

        const black = isBlack ? 0.95 : 0
        
        if (!contentBallRed.current) return;
        const contentBall = contentBallRed.current as HTMLDivElement;
        const { x, y } = style_prop;

        contentBall.style.backgroundImage = `
        radial-gradient(
            circle at ${x}px ${y}px ,
            rgba(255, 255, 255, 0) 20px,
            
            rgba(0, 0, 0, ${black}) 100px
            ),url(${backgroundImg})
            `
    }

    useEffect(() => {
        if (!state.isThemeBlack) return;
        handleMoveBlack(backgroundImg, true);

    }, [style_prop.x, state.isScreenLock]);

    useEffect(() => {
        if (state.isThemeBlack)
            handleMoveBlack(backgroundImg, true);
        else
            handleMoveBlack(backgroundImg, false);

    }, [state.isThemeBlack])


    useLayoutEffect(() => {
      
        contentBallRed.current?.style.opacity!='1';
        return()=>{
        contentBallRed.current?.style.opacity!='0';
        }
        console.log(contentBallRed)
    }, [])

    return (
        <div className={`animation_ball_shadow`}
        // style={{opacity:1}}
            ref={contentBallRed}
        >
            <p className="animation__ball" >

            </p>
        </div>
    )
})



