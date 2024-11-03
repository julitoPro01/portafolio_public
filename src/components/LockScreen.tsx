import { useEffect, useRef } from "react";

import perfil from '../assets/perfil.webp';
import { getDateTime } from '../helper/getDateTime';
import { animationAyes, animationRange } from "../animation";
import { type_uidElement } from "./type";


export const LockScreen = () => {

    const nodeScreen = useRef(null);
    const nodeRange = useRef(null);
    const nodeEye = useRef(null);


    const { dateTime, setDateTime } = getDateTime();

    const { handleMove_eye } = animationAyes({ nodeEye: nodeEye.current! });
    const { handleMove_range, handleDown, handleUp } =
        animationRange({ nodeRange: nodeRange.current!, nodeScreen: nodeScreen.current! });

    const handleTransitionEnd=()=>{
        const lockContent = nodeScreen.current! as HTMLDivElement;
        const lockScreen = lockContent.closest('#'+type_uidElement.lock_screen) as HTMLDivElement;
        lockScreen.style.overflowY='auto'
    }

    useEffect(() => {

        let stop = setInterval(setDateTime, 1000);
        return () =>
            clearInterval(stop)
    }, []);



    return (
        <>
            <div className={`row m-0 ${type_uidElement.lock_screen}`} id={type_uidElement.lock_screen}
                onMouseMove={(e) => { handleMove_range(e); handleMove_eye(e) }}
                onMouseDown={handleDown}
                onMouseUp={handleUp}
                onTouchMove={handleMove_range}
                onTouchStart={handleDown}
                onTouchEnd={handleUp}
                onTransitionEnd={handleTransitionEnd}
            >

                <div className={`row ${type_uidElement.lock_content}`}
                 ref={nodeScreen} >

                    <div className="content-eye">

                        <div className="eye">
                            <div className="eye-eye">
                                <div className="eye-eye-eye" ref={nodeEye}>
                                    <p>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-sm-12  ">
                        <div className=" txt-details" >
                            <p className="txt-hour" >
                                {dateTime.hour} <br />
                            </p>
                            <p className="txt-date">
                                {dateTime.date}
                            </p>

                            <p className=" txt-title">
                                Desarrollo de Software
                            </p>
                        </div>
                    </div>

                    <div className="col content-profile text-center pt-5 ">
                        <figure className="">
                            <img src={perfil} alt="perfil" className="w-50" />
                            <figcaption className="mt-5 fs-5">
                                Hola, <br />
                                Me llamo Zosimo Torres <br />
                                Bienvenido a mi Portafolio!
                            </figcaption>
                        </figure>
                    </div>

                </div>

                <div className="col-12 text-center content-txt-lock">
                    <p className=" text-white txt-msg-lock" ><small>Desliza para desbloquear!</small></p>
                    <div className="range-lock">
                        <p className="range-txt" ref={nodeRange}></p>
                    </div>
                </div>
            </div>
        </>
    )
}
