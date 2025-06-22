import { MouseEvent, useContext, useRef, useState, useEffect } from 'react';
import { LockScreen,  type_uidElement, AnimationBallShadowBody, AsideBar } from "../components";
import { ThemeContext } from "../context/UserThemeContext";

export const AppLayout = ({ children }: any) => {

    const [style_prop, setstyle_prop] = useState({
        x: 0, y: 0
    });

    const { state,
        dispatch_ScreenLock
    } = useContext(ThemeContext);

    const { options } = state;

    const btnOfCavas_ref = useRef<HTMLButtonElement>(null)

    const capaRef = useRef<HTMLDivElement>(null)

    const nodeLayout = useRef<HTMLDivElement>(null);

    const handleMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        setstyle_prop(val => ({ ...val, x: clientX, y: clientY }));
    }



    const handleScreenLock = () => {
        const capa = capaRef.current as HTMLDivElement;
        capa.style.display = "block"
        capa.classList.toggle("animate__fadeIn")
    };

    const onAnimatedEnd = () => {
        dispatch_ScreenLock(true);
        const capa = capaRef.current as HTMLDivElement;
        const target = nodeLayout.current as HTMLDivElement;

        capa.style.display = "none"
        capa.classList.toggle("animate__fadeIn")

        const lockScreen = target.querySelector('#' + type_uidElement.lock_screen) as HTMLDivElement;
        lockScreen.style.display = 'inline-flex';

    }


    useEffect(() => {
        const onresize = () => {
            const width = window.innerWidth;
            if (width > 720) {
                const btn = btnOfCavas_ref.current
                btn?.click()

            }
        }

        window.addEventListener("resize", onresize)

        return () => {
            window.removeEventListener("resize", onresize)
        }

    }, [])

    return (

        <div className="container-fluid p-0 App-layout" >

            <div className={`animate__animated animate__faster _capaLayout`}
                ref={capaRef}
                onAnimationEnd={onAnimatedEnd}
            ></div>

            <div className="content-app-layout"
                onMouseMove={handleMove}
                ref={nodeLayout}
            >

                {/* <AnimationLetters /> */}

                <AnimationBallShadowBody style_prop={style_prop} />

                <LockScreen />

                <div className=" content__appMain " style={{
                    opacity: state.isScreenLock ? 0 : 1,
                    filter: `blur(${state.isScreenLock ? '5px' : '0px'})`,
                }}
                    onTransitionEnd={(e) => {
                        const target = e.target as HTMLDivElement;
                        if (!state.isScreenLock) {
                            target.style.zIndex = '2';
                        } else {
                            target.style.zIndex = '-1';
                        }
                    }}
                >

                    {children}


                </div>
            </div>
            {/* LIGHT - LOCK*/}
            <div className="content-theme-background" >

                {
                    !state.isScreenLock &&
                    <>
                        {
                            !options.isOpendProyect &&
                            <button className="btn btn-outline-light border-0 me-2 mt-2"
                                onClick={handleScreenLock}
                            >
                                <i className="bi bi-lock-fill"></i>
                            </button>
                        }

                        {
                            !options.isOpendProyect &&
                            <button className="btn btn-outline-dark border-0  me-2 mt-2 _openMenu"
                                type="button" data-bs-toggle="offcanvas" data-bs-target="#offCanvasOPenAside" aria-controls="offCanvasOPenAside"
                            >
                                <i className="bi bi-list"></i>
                            </button>
                        }
                    </>

                }
            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offCanvasOPenAside" aria-labelledby="offCanvasOPenAsideLabel">
                <div className="offcanvas-header d-none">
                    <button ref={btnOfCavas_ref} type="button" className="btn" data-bs-dismiss="offcanvas" aria-label="Close">
                    </button>
                </div>
                <div className="offcanvas-body d-flex _body">
                    <AsideBar />
                </div>
            </div>

        </div>
    )
}


