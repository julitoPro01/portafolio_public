import { RefObject, useRef } from "react";
import { PropertyLetter } from "../context/UserType";

export type Posi = {
    x: number, y: number,
    fastX: number, fastY: number, ok: boolean, left: number, top: number
}
export interface PropertiesProp {
    dirTop: number,
    dirRight: number,
    dirBottom: number,
    dirLeft: number,
    dx: number, dy: number,
    fastX: number, fastY: number
}
interface NodeProps_split {
    phrase: string,
    setClassNameChild: string,
    setClassNamefather: string,
}

export const animationLetters = (contentRef: RefObject<HTMLDivElement>) => {



    const txtSplit = ({ phrase, setClassNameChild, setClassNamefather }: NodeProps_split, callback: (node: NodeListOf<HTMLParagraphElement>) => void): Posi[] | false => {


        const node_Content = contentRef.current as HTMLDivElement;

        if (node_Content.querySelector('.' + setClassNamefather)) return false;

        const Array_txt = [...phrase.split('')];
        let position: Posi[] = [];

        const node_father = document.createElement('div');
        node_father.classList.add(setClassNamefather);

        for (let value of Array_txt) {

            node_father.innerHTML += `<p class="${setClassNameChild}" data-ok="true">
                <span class="span_hidden" >${value} </span> <span class="span_visibility" > ${value} </span></p>`
        }
        node_Content.append(node_father);

        const child_node = node_father.querySelectorAll('.' + setClassNameChild) as NodeListOf<HTMLParagraphElement>;

        child_node.forEach((node, i) => {
            const { left, top } = node.getBoundingClientRect();
            if (i % 2) {
                position.push({
                    x: -0, y: 0,
                    fastX: 30, fastY: -30, ok: true, left, top
                })
            } else
                position.push({
                    x: 0, y: -0,
                    fastX: -30, fastY: 30, ok: true, left, top
                })

        })
        callback(child_node)

        return position;
    };

    const getPositionRects = (
        txts: NodeListOf<HTMLParagraphElement>, position: Posi[]) => {
        if (!txts) return;
        txts.forEach((node, i) => {
            const { left, top } = node.getBoundingClientRect();
            position[i].left = left;
            position[i].top = top;
        })

    }

    const getProperties = (propertiesRef: RefObject<PropertiesProp>) => {
        if (!contentRef.current) return;

        const target = contentRef.current as HTMLDivElement;
        propertiesRef.current!.dirRight = target.offsetWidth;
        propertiesRef.current!.dirBottom = target.offsetHeight;
    }

    const setAnimation = (txts: NodeListOf<HTMLParagraphElement>, position: Posi[]) => {

        txts.forEach((node, i) => {
            if (node.dataset.ok == "true") {

                position[i].x += position[i].fastX;
                position[i].y += position[i].fastY;
                position[i].left += position[i].fastX;
                position[i].top += position[i].fastY;
                node.style.transform = `translate(${position[i].x}px, ${position[i].y}px)`;
            }
        })
    }

    const changePosition = (position: Posi[], txts: NodeListOf<HTMLSpanElement>, propertiesRef: RefObject<PropertiesProp>) => {


        position.forEach((dir, i) => {

            const width = propertiesRef.current?.dirRight!;
            const height = propertiesRef.current?.dirBottom!;

            if (dir.left >= width) {
                dir.fastX = -30

            }
            else if (dir.left < 0) {
                dir.fastX = 30;
            }

            if (dir.top >= height) {
                dir.fastY = -30;
            }
            else if (dir.top < 0) {
                dir.fastY = 30;
            }

            if (Math.random() < 0.04) {
                dir.fastX = (Math.random() * 5 - 3) * 10;
                dir.fastY = (Math.random() * 5 - 3) * 10;
                if (txts[i].dataset.ok == 'true')
                    txts[i].querySelector(".span_visibility")!.classList.toggle('changeStyle01');

            }

        })

        return position;
    }

    const adjustPosition = (position: Posi) => {
        if (position.x > 3) position.x -= 2;
        if (position.y > 3) position.y -= 2;
        if (position.x < 0) position.x += 2;
        if (position.y < 0) position.y += 2;
    };

    /// 




    return {
        txtSplit,
        getProperties,
        changePosition,
        setAnimation,
        getPositionRects,
        adjustPosition
    }

}

export const setStyleLetters = () => {
    const setStyleStatic = (txts: NodeListOf<HTMLParagraphElement>) => {

        txts.forEach((node, i) => {
            const span = node.querySelector('.span_visibility') as HTMLSpanElement;
            if (span.classList.contains('changeStyle01')) {
                span.classList.toggle('changeStyle01');
            }
            if (!span.classList.contains('isActiveStyle'))
                span.classList.toggle('isActiveStyle')
        });
    }

    const setStyleNoStatic = (txts: NodeListOf<HTMLParagraphElement>) => {
        txts.forEach((node, i) => {
            const span = node.querySelector('.span_visibility') as HTMLSpanElement;
            if (span.classList.contains('isActiveStyle')) {
                span.classList.toggle('isActiveStyle');
            }

        });
    }

    const setActiveLight = (txts: NodeListOf<HTMLParagraphElement>) => {
        txts.forEach((node) => {
            const span = node.querySelector('.span_visibility') as HTMLSpanElement;
            if (!span.classList.contains('isThemeLight')) {
                span.classList.toggle('isThemeLight');
            }

        });
    }

    const setActiveNotLight = (txts: NodeListOf<HTMLParagraphElement>) => {
        txts.forEach((node) => {
            const span = node.querySelector('.span_visibility') as HTMLSpanElement;
            if (span.classList.contains('isThemeLight')) {
                span.classList.toggle('isThemeLight');
            }

        });
    }


    return {
        setStyleStatic,
        setStyleNoStatic,
        setActiveLight,
        setActiveNotLight
    }
}