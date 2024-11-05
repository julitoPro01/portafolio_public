import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { animationLetters, Posi, PropertiesProp, setStyleLetters } from "../animation/animationLetters"
import { ThemeContext } from "../context/UserThemeContext";
import { tpye_uidElementViewLetter } from "./type";
import { PropertyLetter } from "../context/UserType";

const { content__txt__home, content__txt__skill,
    content__txt__general, content__txt__project, content__txt__contact
} = tpye_uidElementViewLetter;

export const AnimationLetters = () => {

    const { state } = useContext(ThemeContext)

    const postionGeneral_Ref = useRef<Posi[]>([]);
    const postionHome_Ref = useRef<Posi[]>([]);
    const postionSkill_Ref = useRef<Posi[]>([]);
    const postionProject_Ref = useRef<Posi[]>([]);
    const postionContact_Ref = useRef<Posi[]>([]);
    const [controlTime, setcontrolTime] = useState({timer:60});

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
        setAnimation, getPositionRects,adjustPosition,
   } = animationLetters(contentRef);
    const {setActiveLight,setStyleNoStatic,setStyleStatic,
        setActiveNotLight
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
            if (controll.skill) {
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

    const AnimationElementsGeneral = () => {
        const newPosition_general = changePosition(postionGeneral_Ref.current,
            txtNode_general_Ref.current!, propertiesRef);
        setAnimation(txtNode_general_Ref.current!, newPosition_general)

    }

    // ---CREAR LETRAS
    useEffect(() => {

        const position = txtSplit({
            phrase: "<>{}",
            setClassNameChild: "letters__general",
            setClassNamefather: content__txt__general
        }, (nodes) => {
            txtNode_general_Ref.current = nodes;
        });

        if (!position) return;
        postionGeneral_Ref.current = position;

    }, []);
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

    //---CONTROL TIMER
    useEffect(() => {
      let setStop;

      setStop = setTimeout(()=>{
        setcontrolTime({timer:500})
      },2000)
    
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

            if (times > 500) {
                AnimationElementsGeneral()

                times = 0;
            }
            animateFrame = requestAnimationFrame(animate);
        }
        animateFrame = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animateFrame)
        }
    }, [])

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
    }, [state.controlAnimation_letters, state.isScreenLock,controlTime.timer])

    // --- CREAR TITULO
    // ---HOME
    useEffect(() => {
        let updatePosition: number = 0;
        let count = 0;
        let control = false;
        let length = postionHome_Ref.current?.length;

        if (updatePosition != 0) cancelAnimationFrame(updatePosition)

        if (state.isScreenLock) return;

        const updatePosi = () => {
            for (let i in postionHome_Ref.current) {
                const num: number = Number(i);

                if (postionHome_Ref.current[num].x > 3 || postionHome_Ref.current[num].y > 3 ||
                    postionHome_Ref.current[num].x < 0 || postionHome_Ref.current[num].y < 0
                ) {
                    adjustPosition(postionHome_Ref.current[num])
                    count = 0;
                }
                else { 
                    count++ }
                if (count >= length!) { control = true; }

                txtNode_home_Ref.current![num].style.transform = `translate(${postionHome_Ref.current[num].x}px,${postionHome_Ref.current[num].y}px)`

            }
            if (control) {
                cancelAnimationFrame(updatePosition)
                updatePosition = 0;
            }
            else { updatePosition = requestAnimationFrame(updatePosi); }

        }

        if (!state.controlAnimation_letters.home) {
            updatePosition = requestAnimationFrame(updatePosi);
        }

        return () => {
            if (updatePosition != 0) cancelAnimationFrame(updatePosition)
        }

    }, [state.controlAnimation_letters, state.isScreenLock])
    //---SKILL
    useEffect(() => {
        let updatePosition: number = 0;
        let count = 0;
        let control = false;
        let length = postionSkill_Ref.current?.length;

        if (updatePosition != 0) cancelAnimationFrame(updatePosition)

        if (state.isScreenLock) return;

        const updatePosi = () => {
            for (let i in postionSkill_Ref.current) {
                const num: number = Number(i);
                if (postionSkill_Ref.current[num].x > 3 || postionSkill_Ref.current[num].y > 3 ||
                    postionSkill_Ref.current[num].x < 0 || postionSkill_Ref.current[num].y < 0
                ) {
                    adjustPosition(postionSkill_Ref.current[num])
                    count = 0;
                }
                else { count++ }
                if (count >= length!) { control = true; }
                txtNode_skill_Ref.current![num].style.transform = `translate(${postionSkill_Ref.current[num].x}px,${postionSkill_Ref.current[num].y}px)`

            }
            if (control) {
                cancelAnimationFrame(updatePosition)
                updatePosition = 0;
            }
            else { updatePosition = requestAnimationFrame(updatePosi); }

        }

        if (!state.controlAnimation_letters.skill) {
            updatePosition = requestAnimationFrame(updatePosi);
        }

        return () => {
            if (updatePosition != 0) cancelAnimationFrame(updatePosition)
        }

    }, [state.controlAnimation_letters, state.isScreenLock])
    //---PROJECT
    useEffect(() => {
        let updatePosition: number = 0;
        let count = 0;
        let control = false;
        let length = postionProject_Ref.current?.length;

        if (updatePosition != 0) cancelAnimationFrame(updatePosition)

        if (state.isScreenLock) return;

        const updatePosi = () => {
            for (let i in postionProject_Ref.current) {
                const num: number = Number(i);
                if (postionProject_Ref.current[num].x > 3 || postionProject_Ref.current[num].y > 3 ||
                    postionProject_Ref.current[num].x < 0 || postionProject_Ref.current[num].y < 0
                ) {
                    adjustPosition(postionProject_Ref.current[num])
                    count = 0;
                }
                else { count++ }
                if (count >= length!) { control = true; }
                
                txtNode_project_Ref.current![num].style.transform = `translate(${postionProject_Ref.current[num].x}px,${postionProject_Ref.current[num].y}px)`
            }
            if (control) {
                cancelAnimationFrame(updatePosition)
                updatePosition = 0;
            }
            else { updatePosition = requestAnimationFrame(updatePosi); }

        }

        if (!state.controlAnimation_letters.project) {
            updatePosition = requestAnimationFrame(updatePosi);
        }

        return () => {
            if (updatePosition != 0) cancelAnimationFrame(updatePosition)
        }

    }, [state.controlAnimation_letters, state.isScreenLock])
    //---CONTACT
    useEffect(() => {
        let updatePosition: number = 0;
        let count = 0;
        let control = false;
        let length = postionContact_Ref.current?.length;

        if (updatePosition != 0) cancelAnimationFrame(updatePosition)

        if (state.isScreenLock) return;

        const updatePosi = () => {
            for (let i in postionContact_Ref.current) {
                const num: number = Number(i);
                if (postionContact_Ref.current[num].x > 3 || postionContact_Ref.current[num].y > 3 ||
                    postionContact_Ref.current[num].x < 0 || postionContact_Ref.current[num].y < 0
                ) {
                    adjustPosition(postionContact_Ref.current[num])
                    count = 0;
                }
                else { count++ }
                if (count >= length!) { control = true; }
                txtNode_contact_Ref.current![num].style.transform = `translate(${postionContact_Ref.current[num].x}px,${postionContact_Ref.current[num].y}px)`

            }
            if (control) {
                cancelAnimationFrame(updatePosition)
                updatePosition = 0;
            }
            else { updatePosition = requestAnimationFrame(updatePosi); }

        }

        if (!state.controlAnimation_letters.contact) {
            updatePosition = requestAnimationFrame(updatePosi);
        }

        return () => {
            if (updatePosition != 0) cancelAnimationFrame(updatePosition)
        }

    }, [state.controlAnimation_letters, state.isScreenLock])

    //---SET STYLE WHEN IS ACTIVE VIEW
    useEffect(() => {
          
        const {home,skill,project,contact} = state.controlAnimation_letters;
        if(state.isScreenLock){
             setStyleNoStatic(txtNode_home_Ref.current!)
             setStyleNoStatic(txtNode_skill_Ref.current!)
             setStyleNoStatic(txtNode_project_Ref.current!)
             setStyleNoStatic(txtNode_contact_Ref.current!)
      
        }else{   
            !home ? setStyleStatic(txtNode_home_Ref.current!) :setStyleNoStatic(txtNode_home_Ref.current!)
            !skill ? setStyleStatic(txtNode_skill_Ref.current!): setStyleNoStatic(txtNode_skill_Ref.current!)
            !project ? setStyleStatic(txtNode_project_Ref.current!): setStyleNoStatic(txtNode_project_Ref.current!)
            !contact ? setStyleStatic(txtNode_contact_Ref.current!): setStyleNoStatic(txtNode_contact_Ref.current!)
        }
 
    }, [state.controlAnimation_letters, state.isScreenLock])
    

    //---SET STYLE LIGHT WHEN IS PAGE IS LIGHT
    useEffect(() => {
      
        if(state.isThemeBlack){
            setActiveNotLight(txtNode_home_Ref.current!)
            setActiveNotLight(txtNode_skill_Ref.current!)
            setActiveNotLight(txtNode_project_Ref.current!)
            setActiveNotLight(txtNode_contact_Ref.current!)

        }else{
            
            setActiveLight(txtNode_home_Ref.current!)
            setActiveLight(txtNode_skill_Ref.current!)
            setActiveLight(txtNode_project_Ref.current!)
            setActiveLight(txtNode_contact_Ref.current!)
            
        }
    }, [state.isThemeBlack])
    

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
