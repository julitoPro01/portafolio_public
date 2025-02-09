import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { animationLetters, Posi, PropertiesProp, setStyleLetters } from "../animation/animationLetters"
import { ThemeContext } from "../context/UserThemeContext";
import { tpye_uidElementViewLetter } from "./type";
import { PropertyLetter } from "../context/UserType";

const { content__txt__home, content__txt__skill,
    content__txt__project, content__txt__contact
} = tpye_uidElementViewLetter;

export const AnimationLetters = () => {

    const { state } = useContext(ThemeContext)

    const postionGeneral_Ref = useRef<Posi[]>([]);
    const postionHome_Ref = useRef<Posi[]>([]);
    const postionSkill_Ref = useRef<Posi[]>([]);
    const postionProject_Ref = useRef<Posi[]>([]);
    const postionContact_Ref = useRef<Posi[]>([]);
    const [controlTime, setcontrolTime] = useState({ timer: 60 });

    const contentRef = useRef(null);
    const txtNode_general_Ref = useRef<NodeListOf<HTMLParagraphElement>>()
    const txtNode_home_Ref = useRef<NodeListOf<HTMLParagraphElement>>()
    const txtNode_skill_Ref = useRef<NodeListOf<HTMLParagraphElement>>()
    const txtNode_project_Ref = useRef<NodeListOf<HTMLParagraphElement>>()
    const txtNode_contact_Ref = useRef<NodeListOf<HTMLParagraphElement>>()

    const propertiesRef = useRef<PropertiesProp>({
        dirTop: 0,
        dirRight: 0,
        dirBottom: 0,
        dirLeft: 0,
        dx: 0, dy: 0,
        fastX: 4, fastY: 4
    })


    const { txtSplit, getProperties, changePosition,
        setAnimation, getPositionRects,
    } = animationLetters(contentRef);

    const { setActiveLight, setStyleNoStatic, setStyleStatic,
        setActiveNotLight, updateStyleToNoStatic, updateStyleToStatic
    } = setStyleLetters();

    const AnimationElements = (controll: PropertyLetter, isScreenLock: boolean) => {
        if (isScreenLock) {

            const newPosition_home = changePosition(postionHome_Ref.current,
                txtNode_home_Ref.current!, propertiesRef);
            setAnimation(txtNode_home_Ref.current!, newPosition_home)

            const newPosition_skill = changePosition(postionSkill_Ref.current,
                txtNode_skill_Ref.current!, propertiesRef);
            setAnimation(txtNode_skill_Ref.current!, newPosition_skill)

            const newPosition_project = changePosition(postionProject_Ref.current,
                txtNode_project_Ref.current!, propertiesRef);
            setAnimation(txtNode_project_Ref.current!, newPosition_project)

            const newPosition_contact = changePosition(postionContact_Ref.current,
                txtNode_contact_Ref.current!, propertiesRef);
            setAnimation(txtNode_contact_Ref.current!, newPosition_contact)

        }
        else {

            if (controll.home) {
                const newPosition_home = changePosition(postionHome_Ref.current,
                    txtNode_home_Ref.current!, propertiesRef);
                setAnimation(txtNode_home_Ref.current!, newPosition_home)

            }
            if (controll.skill && controll.expertise) {
                const newPosition_skill = changePosition(postionSkill_Ref.current,
                    txtNode_skill_Ref.current!, propertiesRef);
                setAnimation(txtNode_skill_Ref.current!, newPosition_skill)

            }
            if (controll.project) {
                const newPosition_project = changePosition(postionProject_Ref.current,
                    txtNode_project_Ref.current!, propertiesRef);
                setAnimation(txtNode_project_Ref.current!, newPosition_project)

            }
            if (controll.contact) {
                const newPosition_contact = changePosition(postionContact_Ref.current,
                    txtNode_contact_Ref.current!, propertiesRef);
                setAnimation(txtNode_contact_Ref.current!, newPosition_contact)
            }

        }
    }


    // ---CREAR LETRAS

    useEffect(() => {

        const position = txtSplit({
            phrase: "Bienvenido!",
            setClassNameChild: "letters__home",
            setClassNamefather: content__txt__home
        }, (nodes) => {
            txtNode_home_Ref.current = nodes;
        });

        if (!position) return;
        postionHome_Ref.current = position;

    }, []);

    useEffect(() => {

        const position = txtSplit({
            phrase: "Habilidades",
            setClassNameChild: "letters__skill",
            setClassNamefather: content__txt__skill
        }, (nodes) => {
            txtNode_skill_Ref.current = nodes;
        });

        if (!position) return;
        postionSkill_Ref.current = position;

    }, []);

    useEffect(() => {

        const position = txtSplit({
            phrase: "Projectos",
            setClassNameChild: "letters__project",
            setClassNamefather: content__txt__project
        }, (nodes) => {
            txtNode_project_Ref.current = nodes;
        });

        if (!position) return;
        postionProject_Ref.current = position;

    }, []);
    useEffect(() => {

        const position = txtSplit({
            phrase: "Contactar",
            setClassNameChild: "letters__contact",
            setClassNamefather: content__txt__contact
        }, (nodes) => {
            txtNode_contact_Ref.current = nodes;
        });

        if (!position) return;
        postionContact_Ref.current = position;

    }, []);



    useEffect(() => {  //---CONTROL TIMER

        let setStop;

        setStop = setTimeout(() => {
            setcontrolTime({ timer: 500 })
        }, 3500)

        return () => {
            clearTimeout(setStop)
        }
    }, [])


    //--Animar letras
    useEffect(() => {
        let animateFrame: number;
        let prevStamp = 0;
        let times = 0;

        const animate = (timestamp: number) => {

            const delta = timestamp - prevStamp;
            prevStamp = timestamp;
            times += delta;

            if (times > controlTime.timer) {
                AnimationElements(state.controlAnimation_letters,
                    state.isScreenLock)
                times = 0;
            }
            animateFrame = requestAnimationFrame(animate);
        }
        animateFrame = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animateFrame)
        }
    }, [state.controlAnimation_letters, state.isScreenLock, controlTime.timer])

    // --- CREAR TITULO
    // ---HOME
    useEffect(() => {
        let updateZindex: ReturnType<typeof setTimeout>;

        if (!txtNode_home_Ref.current) return;

        if (!state.controlAnimation_letters.home && !state.isScreenLock) {
            updateStyleToStatic(txtNode_home_Ref.current);
            updateZindex = setTimeout(() => {
                setStyleStatic(txtNode_home_Ref.current!)
            }, 2000);
        }


        return () => {
            if (updateZindex) clearTimeout(updateZindex);
            if (!state.controlAnimation_letters.home && !state.isScreenLock) {
                updateStyleToNoStatic(txtNode_home_Ref.current, postionHome_Ref)
            }

        };
    }, [state.controlAnimation_letters.home, state.isScreenLock]);

    //---SKILL
    useEffect(() => {
        let updateZindex: ReturnType<typeof setTimeout>;

        if (!txtNode_skill_Ref.current) return;

        if (!state.controlAnimation_letters.skill || !state.controlAnimation_letters.expertise && !state.isScreenLock) {

                updateStyleToStatic(txtNode_skill_Ref.current)

            updateZindex = setTimeout(() => {
                setStyleStatic(txtNode_skill_Ref.current!)
            }, 2000);
        }

        return () => {
            if (updateZindex) clearTimeout(updateZindex);
            if (!state.controlAnimation_letters.skill && !state.controlAnimation_letters.expertise && !state.isScreenLock) {
                console.log(state.controlAnimation_letters)

                updateStyleToNoStatic(txtNode_skill_Ref.current, postionSkill_Ref);

            }
        }

    }, [
        state.controlAnimation_letters.skill,
        state.controlAnimation_letters.expertise,
        state.isScreenLock
    ])

    // //---PROJECT
    useEffect(() => {

        if (!txtNode_project_Ref.current) return;

        let updateZindex: ReturnType<typeof setTimeout>;

        if (!state.controlAnimation_letters.project && !state.isScreenLock) {

            updateStyleToStatic(txtNode_project_Ref.current)

            updateZindex = setTimeout(() => {
                setStyleStatic(txtNode_project_Ref.current!)
            }, 2000);

        }
        return () => {
            if (updateZindex) clearTimeout(updateZindex);
            if (!state.controlAnimation_letters.project && !state.isScreenLock) {
                updateStyleToNoStatic(txtNode_project_Ref.current, postionProject_Ref)
            }

        }

    }, [state.controlAnimation_letters.project, state.isScreenLock])

    // //---CONTACT
    useEffect(() => {

        if (!txtNode_contact_Ref.current) return;

        let updateZindex: ReturnType<typeof setTimeout>;

        if (!state.controlAnimation_letters.contact && !state.isScreenLock) {
            
            updateStyleToStatic(txtNode_contact_Ref.current);
            updateZindex = setTimeout(() => {
                setStyleStatic(txtNode_contact_Ref.current!)
            }, 2000);
        }

        return () => {
            if (updateZindex) clearTimeout(updateZindex);
        if (!state.controlAnimation_letters.contact && !state.isScreenLock) {
            updateStyleToNoStatic(txtNode_contact_Ref.current,postionContact_Ref)
        }

        }

    }, [state.controlAnimation_letters.contact, state.isScreenLock])
    // //---SET STYLE WHEN IS ACTIVE VIEW
    
    useEffect(() => {

        const { home, skill, project, contact, expertise } = state.controlAnimation_letters;
        if (state.isScreenLock) {
            setStyleNoStatic(txtNode_home_Ref.current!)
            setStyleNoStatic(txtNode_skill_Ref.current!)
            setStyleNoStatic(txtNode_project_Ref.current!)
            setStyleNoStatic(txtNode_contact_Ref.current!)

        } else {
            home && setStyleNoStatic(txtNode_home_Ref.current!);
            if (skill && expertise) { setStyleNoStatic(txtNode_skill_Ref.current!) }
            project && setStyleNoStatic(txtNode_project_Ref.current!);
            contact && setStyleNoStatic(txtNode_contact_Ref.current!);
        }

    }, [state.controlAnimation_letters, state.isScreenLock])


    //---SET STYLE LIGHT WHEN IS PAGE IS LIGHT
    useEffect(() => {

        if (!state.isScreenLock) {
            setActiveNotLight(txtNode_home_Ref.current!)
            setActiveNotLight(txtNode_skill_Ref.current!)
            setActiveNotLight(txtNode_project_Ref.current!)
            setActiveNotLight(txtNode_contact_Ref.current!)

        } else {

            setActiveLight(txtNode_home_Ref.current!)
            setActiveLight(txtNode_skill_Ref.current!)
            setActiveLight(txtNode_project_Ref.current!)
            setActiveLight(txtNode_contact_Ref.current!)

        }
    }, [state.isScreenLock])


    //---ACTUALIZAR DIRECCION
    useLayoutEffect(() => {

        getProperties(propertiesRef)

        window.onresize = () => {

            getPositionRects(txtNode_general_Ref.current!, postionGeneral_Ref.current)
            getPositionRects(txtNode_home_Ref.current!, postionHome_Ref.current)
            getPositionRects(txtNode_skill_Ref.current!, postionSkill_Ref.current)
            getPositionRects(txtNode_project_Ref.current!, postionProject_Ref.current)
            getPositionRects(txtNode_contact_Ref.current!, postionContact_Ref.current)
            getProperties(propertiesRef)
        }

    }, [txtNode_contact_Ref.current]);




    return (
        <div className="content_animation_letters" ref={contentRef}
        >

        </div>
    )
}
