import { FC, RefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { UidNodePage } from "../pages/UidPageNode";
import { Items } from "./IconAsideBar";
import { ThemeContext } from "../context/UserThemeContext";
import { PiCertificateLight } from "react-icons/pi";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

interface AsideProps {
    nodeAppMainRef?: RefObject<HTMLDivElement>
}

const uids = Object.values(UidNodePage);

export const AsideBar: FC<AsideProps> = () => {

    const { state } = useContext(ThemeContext);
    const [rotateCenter, setrotateCenter] = useState(0);
    const [positionList, setpositionList] = useState<{ x: number, y: number, deg: number, i: number }[]>([])

    const ref_icon = useRef<HTMLDivElement>(null)


    const generatePosition = (r = 20, n = 1, call: (v: any) => void) => {

        const values = []
        for (let i = 0; i < n; i++) {
            const coord = i * (((Math.PI / 2)) / (n));
            const x = r * Math.cos(coord)
            const y = r * Math.sin(coord)
            const deg = (90 / n) * (i)
            values.push({ x, y, deg, i })
        }

        call(values)

    }

    const onPage = (nameLink: string) => {
        window.location.href = window.location.origin + `/#${nameLink}`
    }

    useEffect(() => {

        const list = ItemBar.length;
        const radio = 150;
        generatePosition(radio, list, setpositionList)

    }, [])


    // -----------------------------------------

    useEffect(() => {
        const content = document.querySelector("#onScrollView") as HTMLDivElement;
        if (!content) return;
        const uid = uids.map(val => "#" + val);
        const viewPage = document.querySelectorAll(uid.join(",")) as NodeListOf<HTMLDivElement>;
        const map = new Map();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {

                const visibleRatio = entry.intersectionRatio;
                const name = entry.target.id;

                const round = Math.round(visibleRatio * 100);
                const num = Math.max(0, 50 - round);
                map.set(name, num);

                if (calculations(name, map)[name]) {

                    const result = calculations(name, map)[name]();

                    if (!result?.num) return;
                    setrotateCenter(result.num)
                }
            });
        }, { root: null, threshold: Array.from({ length: 101 }, (_, i) => i / 100) });


        viewPage.forEach(node => observer.observe(node));
        return () => {
            viewPage.forEach(node => observer.unobserve(node));

        }
    }, []);






    useLayoutEffect(() => {

        const href = window.location.hash.substring(1);
        const link = state.controlAnimation_letters as any;
        const find = ItemBar.find(val => !link[val.href])
        if (!find || find.href === href) return;
        window.history.replaceState(null, "", window.location.origin + `/#${find.href}`)
    }, [state.controlAnimation_letters]);

    const deg = Math.round((75 / 67.5) * rotateCenter);

    return (
        <>
            <div className="position-absolute top-0 w-100  _iconHome" >
                <form action="mailto:zosimo179@gmail.com" method="post" id="_openformmailto" >
                </form>
                <div className="  _more_info" ref={ref_icon}>

                    <button className="btn   border-0">
                        <a className="" href="https://drive.google.com/file/d/1XFEJm8tF49sPtXWBlLawf4izdvc4f1OV/view?usp=drive_link"
                            target="_blank" >
                            <PiCertificateLight size={"2em"} />
                            <span className="_text_hover animate__animated  mx-2"> Ver Certificaciones</span>
                        </a>
                    </button>

                    <button className="btn   border-0">
                        <a href="https://drive.google.com/file/d/1xDdHLuVWOhtMfEZrmbVdaewm0I05PqFg/view?usp=sharing"
                            target="_blank" >
                            <BsPersonLinesFill size={"2em"} />
                            <span className="_text_hover animate__animated  mx-2"> ver CV </span>
                        </a>
                    </button>
                    <button className="btn  border-0 ">
                        <a href="https://api.whatsapp.com/send?phone=51986875779" target="_blank" >
                            <FaWhatsapp size={"2em"} />
                            <span className="_text_hover animate__animated  mx-2"> WhatsApp </span>
                        </a>

                    </button>
                    <button className="btn  border-0 " form="_openformmailto" type="submit">
                        <MdOutlineMail size={"2em"} />
                        <span className="_text_hover animate__animated  mx-2"> Email </span>
                    </button>


                </div>

            </div>
            <aside className=" content__asideBar">

                <div className=" _contentLink">
                    {
                        positionList.map((_, i) => (
                            <div key={i} className="_items py-2 ">
                                <p className=" m-0" onClick={() => onPage(ItemBar[i].href)} >
                                    {ItemBar[i].title}

                                </p>
                            </div>
                        ))
                    }
                </div>
                <div className=" _contentLink _copy"
                    style={{
                        clipPath: `polygon(
                             0% ${deg}%,
                             100% ${deg}%,
                             100% ${20 + deg}%,
                             0% ${20 + deg}%
                        )`
                    }}
                >
                    {
                        positionList.map((_, i) => (
                            <div key={i} className="_items py-2 ">
                                <p className=" m-0" onClick={() => onPage(ItemBar[i].href)} >
                                    {ItemBar[i].title}

                                </p>
                            </div>
                        ))
                    }
                </div>

            </aside>


            <div className="_footer" >
                <p className="m-0" >© / 2025</p>
            </div>
        </>
    )
}

const calculations: any = (name: string, map: Map<any, any>) => {
    const result = map.get(name)
    return {
        home: () => {
            if (result < 50 && map.get("expertise") < 50) {
                let de = Math.round(((22.5 / 50) * result) * 10) / 10;
                if (de > 21 && de < 23) de = 22.5;
                return { num: de, name: name }
            }
        },
        expertise: () => {
            if (result < 50 && map.get("project") < 50) {
                let de = Math.round((((22.5 / 50) * result) + 23) * 10) / 10;
                if (de > 23 && de <= 25) de = 22.5;
                // console.log(result)
                return { num: de, name: name }
            }
        },
        project: () => {
            if (result < 50 && map.get("contact") < 50) {
                let de = Math.round((((23 / 50) * result) + 45) * 10) / 10;
                if (de > 45 && de < 46) de = 45;
                if (de > 65) de = 67.5;

                return { num: de, name: name }
            }
        }
    }
};



const ItemBar: Items[] = [
    {
        href: UidNodePage.home,
        title: 'Sobre mí',
        icon: 'bi bi-house-door'
    },
    {
        href: UidNodePage.expertise,
        title: 'Experiencia',
        icon: 'bi bi-clock'
    },
    {
        href: UidNodePage.project,
        title: 'Proyectos',
        icon: 'bi bi-code-slash'
    },
    {
        href: UidNodePage.contact,
        title: 'Contactar',
        icon: 'bi bi-person-lines-fill'
    }
]