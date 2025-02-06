import { memo, useContext, useEffect, useMemo, useRef } from "react";
import { ThemeContext } from "../context/UserThemeContext";


interface Props {
    style_prop: { x: number, y: number }
}

export const AnimationBallShadowBody = memo(({ style_prop }: Props) => {

    const contentBallRed = useRef<HTMLDivElement>(null);

    const { state } = useContext(ThemeContext);

    const wallpaper = useMemo(() => contentBallRed.current?.querySelector('.wallpaper') as HTMLDivElement,
        [contentBallRed.current]);

    const handleMoveCircle = (target: HTMLDivElement, light: number) => {

        target.style.background = `
        radial-gradient(
        circle at ${style_prop.x}px ${style_prop.y}px ,
        rgba(255, 255, 255, 0) 25px, rgba(0, 0, 0, ${light}) 50px
         )`
    }

    // ----MOVE THE CIRCLE
    useEffect(() => {
        const target = wallpaper as HTMLDivElement;
        if (!target) return;
        if (state.isThemeBlack) return;
        handleMoveCircle(target, 0.8)
    }, [style_prop])

    //----SET THE THEME (LIGHT | NIGHT)
    useEffect(() => {

        if (!wallpaper) return;

        if (state.isThemeBlack)
            wallpaper.style.opacity = '0'
        else
            wallpaper.style.opacity = '1'

    }, [state.isThemeBlack,]);




    return (
        <div className={`animation_ball_shadow`}
            style={{ opacity: 1 }}
            ref={contentBallRed}

        >
            <div className="wallpaper" >

            </div>
        </div>
    )
})



