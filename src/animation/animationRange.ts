import { useContext, useState } from "react";
import { ThemeContext } from "../context/UserThemeContext";
import { type_uidElement } from "../components";

interface Props {
    nodeRange: HTMLDivElement,
    nodeScreen: HTMLDivElement,
}

let maxWidth = 200;

export const animationRange = ({ nodeRange, nodeScreen }: Props) => {

    const [client, setclient] = useState({ numX: 0, numY: 0, xy: 0, isOpen: false });
    const { dispatch_ScreenLock } = useContext(ThemeContext);

    const Screen = nodeScreen as HTMLDivElement;

    const setRange = (ev: any) => {
        const nodeLock = Screen.closest("#" + type_uidElement.lock_screen) as HTMLDivElement;
        nodeLock.style.overflowY = 'hidden'
        nodeRange.style.transition = 'none';
        const x = ev.clientX > client.numX ? (ev.clientX - client.numX) : (client.numX - ev.clientX)
        const y = ev.clientY > client.numY ? (ev.clientY - client.numY) : (client.numY - ev.clientY)
        setclient((value) => ({ ...value, xy: x + y }))
        nodeRange.style.width = `${client.xy-5}px`;

        const scale = (.5 / maxWidth) * client.xy
        Screen.style.transform = `scale(${1 + scale}, ${1 + scale})`;
        Screen.style.opacity = `${1 - scale * 2}`;

        if (client.xy > maxWidth) {

            nodeRange.style.background = '#f4f7f4';
            nodeRange.style.width = "20px";

            if (nodeLock) {
                nodeLock.style.display = 'none';

            };
            dispatch_ScreenLock(false);

            setclient({ numX: 0, numY: 0, xy: 0, isOpen: false });
        }
    }



    const handleMove_range = (e: any) => {

        if (!client.isOpen) return;

        if (e.touches) {
            setRange(e.touches[0])
        } else {
            setRange(e)
        }
    }

    const handleDown = (e: any) => {
        setclient((value) => ({ ...value, isOpen: true }))

        if (e.touches) {
            const ev = e.touches[0]
            setclient((value) => ({ ...value, numX: ev.clientX, numY: ev.clientY }))

        } else
            setclient((value) => ({ ...value, numX: e.clientX, numY: e.clientY }))
    }

    const handleUp = () => {
        setclient((value) => ({ ...value, isOpen: false }));
        if (client.xy < maxWidth) {

            setclient((value) => ({ ...value, xy: 0 }));
            const nodeLock = Screen.closest("#" + type_uidElement.lock_screen) as HTMLDivElement;
            nodeLock.style.overflowY = 'auto'
            nodeRange.style.width = "20px";
            nodeRange.style.transition = "width .4s ease-in";
            Screen.style.transform = "scale(1,1)";
            Screen.style.opacity = "1";

            Screen.style.transition = `
                    transform .4s linear,
                    opacity 1s linear`;

            Screen.ontransitionend = () => {
                Screen.style.transition = "";

            }
        }
    }

    return {
        handleDown,
        handleUp,
        handleMove_range
    }

}
