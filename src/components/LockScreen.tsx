import { useContext, useEffect, useRef } from "react";
import { getDateTime } from '../helper/getDateTime';
import { type_uidElement } from "./type";
import { ThemeContext } from "../context/UserThemeContext";


export const LockScreen = () => {

    const { dispatch_ScreenLock } = useContext(ThemeContext);
    const nodeScreen = useRef<HTMLDivElement>(null);
    const capaRef = useRef<HTMLDivElement>(null);
    const content_applayout = useRef<HTMLDivElement>()

    const { dateTime, setDateTime } = getDateTime();

    const onStartUnlockScreenHome = () => {
        window.location.replace(window.location.origin + `/#home`);
        const capa = capaRef.current as HTMLDivElement;
        capa.classList.toggle("_capaActive")
    }

    const onStartUnlockScreenProyect = () => {
        window.location.replace(window.location.origin + `/#project`);
        const capa = capaRef.current as HTMLDivElement;

        capa.classList.toggle("_capaActive")

    }
    const onEndUnlockScreen = () => {
        const capa = capaRef.current as HTMLDivElement;

        const screen = nodeScreen.current as HTMLDivElement;
        const content = screen.parentNode as HTMLDivElement;
        content.style.display = "none";
        dispatch_ScreenLock(false);

        capa.classList.toggle("_capaActive")
    }
    useEffect(() => {

        content_applayout.current = document.querySelector(".content-app-layout") as HTMLDivElement;
    }, [])


    useEffect(() => {

        let stop = setInterval(setDateTime, 1000);
        return () =>
            clearInterval(stop)
    }, []);

    useEffect(() => {



        return () => {
        }
    }, [])


    return (
        <>
            <div className={`row m-0 pb-4 ${type_uidElement.lock_screen}`} id={type_uidElement.lock_screen}
            >

                    <div className={`_capa text-light 
                        `}
                        onAnimationEnd={onEndUnlockScreen}
                        ref={capaRef} >
                    </div>

                    <div className={`_capaActiveUpload `}
                         >
                    </div>

                <div className={`row m-0  ${type_uidElement.lock_content}`}
                    ref={nodeScreen}
                // onTransitionEnd={onEndUnlockScreen}
                >

                    <div className="_content_date">
                        <div className=" txt-details" >
                            <p className="txt-hour" >
                                {dateTime.hour}
                            </p>

                            <p className="txt-date m-0">
                                {dateTime.date}
                            </p>
                        </div>
                    </div>

                    <div className="col-12 d-flex align-items-center content-profile text-center "
                        onTransitionEnd={(event) => {
                            event.stopPropagation()
                        }} >
                        <div className="row _content_ w-100 h-100 m-0 animate__animated animate__fadeInUp  ">

                            <div className="col-12 col-md-6 w-100 align-self-end ">


                            </div>

                            <div className=" px-2  _contet_p " >
                                <p className="_txt_content _title m-0 pt-4">
                                    Hola,
                                    Me llamo Zosimo Torres
                                </p>
                                <p className="_subtitle02">¡Bienvenido a mi Portafolio! </p>
                                <p className="_subtitle" >Conoce mis habilidades y proyectos</p>
                                <ul className="_sublist">
                                    <li> {`{ Node.js }`}</li>
                                    <li>{`{ ASP.NET Core }`}</li>
                                    <li>{`< React />`}</li>
                                </ul>
                            </div>


                            <div className="_btn_enter">
                                <div className="_btn01 mx-3 ">
                                    <div className="_snake01" ></div>
                                    <div className="_snake02" ></div>
                                    <button className="p-2 px-3 rounded-0"
                                        onClick={onStartUnlockScreenProyect}
                                    > <span>{"<"}</span> Explora mis proyectos <span>{"/>"}</span>
                                    </button>
                                </div>

                                <div className="_btn02 mx-3">
                                    <div className="_snake01" ></div>
                                    <div className="_snake02" ></div>
                                    <button className="p-2 px-3 rounded-0"
                                        onClick={onStartUnlockScreenHome} >  <span>{"<"}</span> Conoce más sobre mí <span>{"/>"}</span>  </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
