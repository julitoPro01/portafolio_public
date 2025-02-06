import { Children, cloneElement, isValidElement, MouseEvent, ReactElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import { LockScreen, AnimationLetters, type_uidElement, AnimationBallShadowBody } from "../components";
import { ThemeContext } from "../context/UserThemeContext";
import { DataContext } from "../context/UserDataContext";
import { DetailsProject } from "../pages";


export const AppLayout = ({ children }: any) => {

    const [style_prop, setstyle_prop] = useState({
        x: 0, y: 0
    });

    const { state: stateCord } = useContext(DataContext);
    const { state, dispatch_ThemeLight, dispatch_ThemeNight,
        dispatch_ScreenLock
    } = useContext(ThemeContext);

    const [positionClip, setpositionClip] = useState({
        x1: '0', y1: '0',
        x2: '0', y2: '0',
        x3: '0', y3: '0',
        x4: '0', y4: '0'
    })

    const RefContainerOfProyect = useRef<HTMLDivElement>(null);

    const nodeLayout = useRef<HTMLDivElement>(null);
    const refContentProyect = useRef<HTMLDivElement>(null);


    const nodeAppMainRef = useRef<HTMLDivElement>(null);



    const handleEndTransition = () => {
        if (!RefContainerOfProyect.current) return;

        if (!stateCord.stateCordOfProyect.open) {
            const targetFather = refContentProyect.current as HTMLDivElement;

            targetFather.style.opacity = '0';
            const targetChild = RefContainerOfProyect.current as HTMLDivElement;

            if (!targetChild) return;

            setTimeout(() => {
                targetFather.style.transition = '';
                targetFather.scrollTo(0, 0)
                setpositionClip({ x1: '0', y1: '0', x2: '0', y2: '0', x3: '0', y3: '0', x4: '0', y4: '0' })
            }, 600)

        }

    }



    const handleCloseContent = useCallback(() => {

        const btn = document.getElementById(stateCord.stateCordOfProyect.id) as HTMLDivElement;

        if (!btn) return;
        btn.click();

    }, [stateCord.stateCordOfProyect.open])

    const handleMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        setstyle_prop(val => ({ ...val, x: clientX, y: clientY }));
    }



    const handleChangeTheme = () => {

        if (state.isThemeBlack) {
            dispatch_ThemeLight();
        }
        else {
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
        if (!state.isScreenLock) {
            target.style.zIndex = '2';
        }

        target.scrollIntoView({ behavior: "smooth", block: "start" })

    }, [state.isScreenLock]);

    useEffect(() => {


        const { left, top, width, height } = stateCord.stateCordOfProyect;

        const x1 = left + 'px';
        const y1 = top + 'px';

        const x2 = (left + width) + 'px';
        const y2 = top + 'px';

        const x3 = (left + width) + 'px';
        const y3 = (top + height) + 'px';

        const x4 = left + 'px';
        const y4 = (top + height) + 'px';

        setpositionClip({ x1, y1, x2, y2, x3, y3, x4, y4 })

    }, [stateCord.stateCordOfProyect])


    useEffect(() => {
        let num;

        num = setTimeout(() => {
            if (!RefContainerOfProyect.current) return;

            if (!stateCord.stateCordOfProyect.open) return;

            const targetFather = refContentProyect.current as HTMLDivElement;
            targetFather.style.transition = " clip-path 1s ease-in-out, opacity .1s linear";
            targetFather.style.opacity = '1';
            setpositionClip({ x1: '0%', y1: '0%', x2: '100%', y2: '0%', x3: '100%', y3: '100%', x4: '0%', y4: '100%' })

        }, 1000);

        return () => {
            if (num) clearTimeout(num);
        }
    }, [stateCord.stateCordOfProyect.open])


    return (
        
        <div className="container-md p-0 App-layout" >
             <div className="_backgroundImga"
                    style={{
                        transform: `translateX( ${state.isScreenLock ? '50%' : '0%'}) translateY(10%)`
                    }}
                >
                </div>
            <div className="content-app-layout"
                onMouseMove={handleMove}
                ref={nodeLayout}
            >

                <AnimationLetters />

                <AnimationBallShadowBody style_prop={style_prop} />

                <LockScreen />

                <div className=" content__appMain " style={{
                    opacity: state.isScreenLock ? 0 : 1,
                }} ref={nodeAppMainRef}
                    onTransitionEnd={(e) => {
                        const target = e.target as HTMLDivElement;
                        if (!state.isScreenLock) {
                            target.style.zIndex = '2';
                        } else {
                            target.style.zIndex = '-1';
                        }
                    }}
                >
                    {
                        Children.map(children, (child) => (
                            isValidElement(child)
                                ? cloneElement(child as ReactElement, { nodeAppMainRef })
                                : child

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
                            ? <i className={`bi bi-moon-stars-fill text-light`}
                            ></i>
                            : <i className={`bi bi-sun-fill text-light`} >
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

            {/* TODO: */}
            <div className="content_of_proyect"
                ref={refContentProyect}
                onTransitionEnd={handleEndTransition}
                style={{
                    clipPath: `polygon(
                    ${positionClip.x1} ${positionClip.y1},
                    ${positionClip.x2} ${positionClip.y2},
                    ${positionClip.x3} ${positionClip.y3},
                    ${positionClip.x4} ${positionClip.y4} )`
                }}
            >
                <div
                    className="of_detailsProyect"
                    ref={RefContainerOfProyect}
                >


                    <DetailsProject handleCloseContent={handleCloseContent} />

                </div>
            </div>


        </div>
    )
}


