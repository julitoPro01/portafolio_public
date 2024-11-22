import { FC, RefObject, useCallback, useContext, useEffect, useRef } from "react";
import { UidNodePage,UidNodePagevalue } from "../pages/UidPageNode";
import { IconAsideBar, Items } from "./IconAsideBar";
import { ThemeContext } from "../context/UserThemeContext";

interface AsideProps {
    nodeAppMainRef?: RefObject<HTMLDivElement>
}

const uids = Object.values(UidNodePage);

export const AsideBar: FC<AsideProps> = ({ nodeAppMainRef }: AsideProps) => {

    const {dispatch_lettersAnimateControl}=useContext(ThemeContext);

    const previousNodeRef = useRef<HTMLParagraphElement>();
    const nodeLinkRef = useRef<HTMLUListElement>(null);

    const numGetPositionUid = useRef({ isScroll: false });


    const target = useCallback(
        () => {
            return nodeAppMainRef?.current as HTMLDivElement;
        },
        [nodeAppMainRef?.current]
    )

    const getVisibleView = () => {

        return new Promise((resol) => {


            const observer = new IntersectionObserver((entries) => {

                for (let entry of entries) {
                    if (entry.isIntersecting) {
                        // entry.target;
                        resol(entry.target);
                        observer.disconnect()
                        break;
                    }
                }
            }, { root: null, threshold: 0.7 });

            const mod = uids.map(va => (va = '#' + va))
            const pages = target().querySelectorAll(mod.join(', '));
            pages.forEach(node => observer.observe(node));


        })

    }

    const onEndScroll = () => {
        getVisibleView().then(pageNode => {
            
            const visibleElement = pageNode as HTMLDivElement;

            const id = visibleElement.id;

            numGetPositionUid.current.isScroll &&
                (window.location.href = '#' + id);

            const link = nodeLinkRef.current?.querySelectorAll('a');

            for (let node of link!) {
                const Attribute = node.getAttribute('href')

                if (Attribute == '#' + id) {

                    previousNodeRef.current?.classList.toggle('active')

                    const p = node.querySelector('p') as HTMLParagraphElement;
                    p.classList.toggle('active');

                    previousNodeRef.current = p;

                    break;
                }
            }

            const viewVisibility:UidNodePagevalue=visibleElement.id as UidNodePagevalue;
            switch(viewVisibility){
                case "home":dispatch_lettersAnimateControl("[type_animate_lettersHome]");break;
                case "skil":dispatch_lettersAnimateControl("[type_animate_lettersSkill]");break;
                case "expertise":dispatch_lettersAnimateControl("[type_animate_lettersEspertise]");break;
                case "project":dispatch_lettersAnimateControl("[type_animate_lettersProject]");break;
                case "contact":dispatch_lettersAnimateControl("[type_animate_lettersContact]");break;
            }
        })
    }


    const onScroll = (direction: number) => {

        const { height } = target().getBoundingClientRect();
        target().scrollBy({
            top: height * direction,
            behavior: "smooth",
        });

        numGetPositionUid.current.isScroll = true;
    }

    const onGetPosition = () => {
        numGetPositionUid.current.isScroll = false;
    }

useEffect(() => {
  
    onEndScroll()
  
}, []);


    useEffect(() => {
if(!target()) return;
        let clearTime:ReturnType<typeof setTimeout>;
        const activeView =()=>{
            if(clearTime) clearTimeout(clearTime);

            clearTime = setTimeout(()=>{
                onEndScroll()
            },100)
        }

        target().addEventListener('scroll',activeView)

        previousNodeRef.current = nodeLinkRef.current
            ?.querySelector('a')?.querySelector('p')!;

        return()=>{
            if(!target()) return
            target().removeEventListener('scroll',activeView)
        }
            
    }, []);



    return (

            <aside className=" content__asideBar m-0 p-0">
                <ul className="m-0 p-0 " ref={nodeLinkRef}>

                    <li className="icon text-center">
                        <p className="fs-1 m-0" >
                            <i className=" bi bi-arrow-up-short py-0 "
                                onClick={() => onScroll(-1)} ></i>
                        </p>
                    </li>

                    {
                        ItemBar.map((value, i) => (
                            <IconAsideBar key={value.href} Props={{ value, i, onGetPosition }} />
                        ))
                    }

                    <li className=" icon text-center">

                        <p className="fs-1">
                            <i className=" bi bi-arrow-down-short "
                                onClick={() => onScroll(1)} ></i>
                        </p>
                    </li>

                </ul>
            </aside>
    )
}



const ItemBar: Items[] = [
    {
        href: UidNodePage.home,
        title: 'Inicio',
        icon: 'bi bi-house-door'
    },
    {
        href: UidNodePage.skil,
        title: 'Abilidades',
        icon: 'bi bi-journal-code'
    },
    {
        href:UidNodePage.expertise,
        title:'Experiencia',
        icon:'bi bi-clock'
    },
    {
        href: UidNodePage.project,
        title: 'Projectos',
        icon: 'bi bi-code-slash'
    },
    {
        href: UidNodePage.contact,
        title: 'Contactar',
        icon: 'bi bi-person-lines-fill'
    }
]