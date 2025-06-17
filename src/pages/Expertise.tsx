import { UidNodePage } from "./UidPageNode"

import {  useEffect, useRef } from "react";
import { FaAws, FaBootstrap, FaCss3Alt, FaDocker, FaGithub, FaHtml5, FaJava, FaNode, FaSass } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { RiJavascriptFill, RiReactjsLine, RiSettings5Fill } from "react-icons/ri";
import { IconBaseProps } from "react-icons";
import { SiCloudinary, SiDotnet, SiFirebase, SiMongodb, SiMysql } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { GrHeroku } from "react-icons/gr";
import { IoServerOutline } from "react-icons/io5";

export const Expertise = () => {

    const descRef = useRef<HTMLDivElement>(null);
    const itemsD_front = useRef<{ i: number, left: number, top: number }[]>([]);

    useEffect(() => {
        const node = descRef.current
        if (!node) return;
        const length = listIconDev.frontend.length;
        listIconDev.frontend.forEach((_, i) => {
            itemsD_front.current.push({ i: length - i, left: i * 4, top: i * 4 });

        })


        return () => {
        }
    }, [descRef.current])


    return (
        <div className="content__expersite" id={UidNodePage.expertise}>
     
            <div className="_pageHead" >
                <p className="_head m-0">Experiencia
                </p>
                <p className="fst-italic p-5 fs-4 fw-bold _frase"> "Las imaginaciones se construyen a base de código y herramientas." </p>
            </div>
            <div className="py-5 _icons_content">
                <p className="fs-1 p-5 pt-3 pb-3 text-center _title">Lenguajes y herramientas que uso en mis proyectos </p>
                <p className=" p-5 pt-3 _phare">
                    A lo largo de mi aprendizaje y desarrollo, he trabajado con una variedad de tecnologías que me permiten construir soluciones robustas y eficientes. Estas herramientas son la base de los proyectos que desarrollo,
                    desde interfaces dinámicas con React hasta backends escalables con Node.js y .NET.
                </p>
            </div>

            <div className="_paperBook">
                <div className="_content_devs">

                    <div className="p-4 fs-1 m-0 _txt">

                        <p>Frontend Developer  <RiReactjsLine /></p>
                        <div className="_child">
                            <div className="d-flex flex-wrap _name">
                                {
                                    listIconDev.frontend.map((val) => (
                                        <p key={val.name}
                        
                                            className="fs-6 mx-3 px-3"> {val.name} </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="p-4 fs-1 m-0 _txt">
                        <p>Backend Developer <IoServerOutline /></p>
                        <div className="_child">
                            {
                                listIconDev.backend.map(val => (
                                    <p key={val.name} className="fs-6 mx-3 px-3"
                                    > {val.name} </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="p-4 fs-1 m-0 _txt">
                        <p> DevOps y Despliegue  <RiSettings5Fill /></p>
                        <div className="_child">
                            {
                                listIconDev.others.map(val => (
                                    <p key={val.name} className="fs-6 mx-3 px-3"
                                    > {val.name} </p>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

interface IListDevIcon {
    frontend: IJsxIcon[],
    backend: IJsxIcon[],
    others: IJsxIcon[]
}

interface IJsxIcon {
    icon: (base?: IconBaseProps) => JSX.Element,
    name: string,
    class?: string
}

const listIconDev: IListDevIcon = {
    frontend: [
        {
            icon: (base) => <FaHtml5 {...base} />,
            name: "React"
        },
        {
            icon: (base) => <FaHtml5 {...base} />,
            name: "HTML"
        }, {
            icon: (base) => <FaCss3Alt {...base} />,
            name: "CSS"
        }, {
            icon: (base) => <RiJavascriptFill {...base} />,
            name: "JavaScript"
        },
        {
            icon: (base) => <BiLogoTypescript {...base} />,
            name: "TypeScript"
        },
        {
            icon: (base) => <FaSass {...base} />,
            name: "Sass"
        },
        {
            icon: (base) => <FaBootstrap {...base} />,
            name: "Bootstrap"
        },
    ],
    backend: [{
        icon: (base) => <FaNode {...base} />,
        name: "Node.js"
    },
    {
        icon: (base) => <FaJava {...base} />,
        name: "Java"
    },
    {
        icon: (base) => <SiDotnet {...base} />,
        name: ".Net Core"
    },
    {
        icon: () => <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2rem" height="2rem" viewBox="0,0,256,256">
            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.12,5.12)"><path d="M25,2c-0.71484,0 -1.42969,0.17969 -2.06641,0.53906l-16.84375,9.46484c-1.28906,0.72266 -2.08984,2.07813 -2.08984,3.53125v18.92969c0,1.45313 0.80078,2.80859 2.08984,3.53125l16.84375,9.46484c0.63672,0.35938 1.35156,0.53906 2.06641,0.53906c0.71484,0 1.42969,-0.17969 2.06641,-0.53906l16.84375,-9.46094c1.28906,-0.72656 2.08984,-2.08203 2.08984,-3.53516v-18.92969c0,-1.45312 -0.80078,-2.80859 -2.08984,-3.53125l-16.84375,-9.46484c-0.63672,-0.35937 -1.35156,-0.53906 -2.06641,-0.53906zM25,13c3.78125,0 7.27734,1.75391 9.54297,4.73828l-4.38281,2.53906c-1.31641,-1.44141 -3.1875,-2.27734 -5.16016,-2.27734c-3.85937,0 -7,3.14063 -7,7c0,3.85938 3.14063,7 7,7c1.97266,0 3.84375,-0.83594 5.16016,-2.27734l4.38281,2.53906c-2.26562,2.98438 -5.76172,4.73828 -9.54297,4.73828c-6.61719,0 -12,-5.38281 -12,-12c0,-6.61719 5.38281,-12 12,-12zM35,20h2v2h2v-2h2v2h2v2h-2v2h2v2h-2v2h-2v-2h-2v2h-2v-2h-2v-2h2v-2h-2v-2h2zM37,24v2h2v-2z"></path></g></g>
        </svg>,
        name: "C#"
    },
    {
        icon: (base) => <DiMsqlServer {...base} />,
        name: "SQL Server"
    }, {
        icon: (base) => <SiMysql {...base} />,
        name: "MySQL"
    }, {
        icon: (base) => <SiMongodb {...base} />,
        name: "Mongodb"
    },
    {
        icon: (base) => <SiFirebase {...base} />,
        name: "Firebase"
    }
    ],
    others: [{
        icon: (base) => <FaGithub {...base} />,
        name: "Git - GitHub",
        class: "others"
    }, {
        icon: (base) => <FaAws {...base} />,
        name: "AWS",
        class: "others"
    }, {
        icon: (base) => <FaDocker {...base} />,
        name: "Docker",
        class: "others"
    },
    {
        icon: (base) => <GrHeroku {...base} />,
        name: "Heroku",
        class: "others"
    },
    {
        icon: (base) => <SiCloudinary {...base} />,
        name: "Cloudinary",
        class: "others"
    },
    {
        icon: () => <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2rem" height="2rem" viewBox="0 0 50 50">
            <path fill="#ffffff" d="M 8 7 C 4.69 7 2 9.69 2 13 L 2 33 C 2 35.97 4.16 38.440156 7 38.910156 L 7 36.869141 C 5.27 36.429141 4 34.86 4 33 L 4 13 C 4 10.79 5.79 9 8 9 L 41 9 C 43.21 9 45 10.79 45 13 L 45 33 C 45 34.86 43.73 36.429141 42 36.869141 L 42 38.910156 C 44.84 38.440156 47 35.97 47 33 L 47 13 C 47 9.69 44.31 7 41 7 L 8 7 z M 36.5 15 C 35.119 15 34 16.119 34 17.5 L 34 41.5 C 34 42.881 35.119 44 36.5 44 C 37.881 44 39 42.881 39 41.5 L 39 17.5 C 39 16.119 37.881 15 36.5 15 z M 20.5 21 C 19.119 21 18 22.119 18 23.5 L 18 41.5 C 18 42.881 19.119 44 20.5 44 C 21.881 44 23 42.881 23 41.5 L 23 23.5 C 23 22.119 21.881 21 20.5 21 z M 28.5 25 C 27.119 25 26 26.119 26 27.5 L 26 41.5 C 26 42.881 27.119 44 28.5 44 C 29.881 44 31 42.881 31 41.5 L 31 27.5 C 31 26.119 29.881 25 28.5 25 z M 12.5 30 C 11.119 30 10 31.119 10 32.5 L 10 41.5 C 10 42.881 11.119 44 12.5 44 C 13.881 44 15 42.881 15 41.5 L 15 32.5 C 15 31.119 13.881 30 12.5 30 z"></path>
        </svg>,
        name: "Power BI",
        class: "others"
    }

    ]
}
