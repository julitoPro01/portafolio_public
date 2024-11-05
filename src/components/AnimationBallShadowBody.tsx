import { memo, useContext, useEffect, useRef } from "react";

import backgroundImg02 from '../assets/fondodepantalla02.jpg';

import { ThemeContext } from "../context/UserThemeContext";


interface Props {
    style_prop: { x: number, y: number }
}

export const AnimationBallShadowBody = memo(({ style_prop }: Props) => {

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
        handleMoveBlack(backgroundImg02, true);

    }, [style_prop.x, state.isScreenLock]);

    useEffect(() => {
        if (state.isThemeBlack)
            handleMoveBlack(backgroundImg02, true);
        else
            handleMoveBlack(backgroundImg02, false);

    }, [state.isThemeBlack])


    return (
        <div className={`animation_ball_shadow`}
            style={{opacity:1}}
            ref={contentBallRed}
        >
   
        </div>
    )
})



