import { useContext, memo, useRef, useState, useLayoutEffect, useEffect, UIEvent } from 'react';
import { DataContext } from "../context/UserDataContext"

import { FaGithub, FaWindowClose } from 'react-icons/fa';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';

import { UidNodePage } from "./UidPageNode";
import { StateDataProject } from '../context/UserDataType';
import { BsGlobe2 } from 'react-icons/bs';
import { ThemeContext } from '../context/UserThemeContext';

type PropModal = { isOk: boolean, isLoading: boolean };

interface PropTypeAnimation {
  animation_child: "animate__zoomInDown" | "animate__zoomOutDown",
  animation_content: "animate__fadeIn" | "animate__fadeOut";
}

export const Project = memo(() => {

  const { state } = useContext(DataContext);
  const { stateProject } = state;

  const { dispatch_handleOpendProject } = useContext(ThemeContext);

  const asideBar_ref = useRef<HTMLDivElement>()
  const [images, setImages] = useState({
     first: 0, second: 0, isChanged: false, isTouch: false });
  const isControl = useRef(0);

  const [stateModal, setStateModal] = useState<PropModal>({ isOk: false, isLoading: false })
  const [stateAnimation, setStateAnimation] = useState<PropTypeAnimation>({
    animation_content: "animate__fadeIn", animation_child: "animate__zoomInDown"
  });

  const [index, setindex] = useState(0)

  const onChangeImg = (index: number) => {

    if (isControl.current === index) return;
    isControl.current = index;

    // if(images.)

    if (images.isChanged) {
      setImages(v => ({ ...v, isChanged: false, first: index }));
    } else {
      setImages(v => ({ ...v, isChanged: true, second: index, isTouch: true }))
    }
  }


  const onOpenModal = (index: number) => {

    setStateModal({ isLoading: false, isOk: true })
    setStateAnimation({ animation_content: "animate__fadeIn", animation_child: "animate__zoomInDown" });
    onChangeIndex(index)
    dispatch_handleOpendProject(true)
  }


  const onChangeIndex = (index: number) => {
    if (index < 0 || index > stateProject.length - 1) return;
    setindex(index)
  }

  const onCloseLoading = () => {
    setStateModal(v => ({ ...v, isLoading: true }))
    setStateAnimation({ animation_content: "animate__fadeOut", animation_child: "animate__zoomOutDown" })
  }

  const onCloseModal = () => {
    if (stateModal.isOk && stateModal.isLoading) {
      setStateModal({ isLoading: false, isOk: false })
      dispatch_handleOpendProject(false)
    }

  }

  useLayoutEffect(() => {


    const _aside_bar = document.querySelector("._aside_bar") as HTMLDivElement;
    if (!_aside_bar) return;

    asideBar_ref.current = _aside_bar;

  }, [])


  return (
    <>
      {
        stateModal.isOk && <Details
          {...{ stateAnimation, onCloseLoading, onCloseModal, stateProject, index, onChangeIndex }} />
      }


      {/* ---------------------------------------------------------- */}
      <div className="pb-5 content__body__project" id={UidNodePage.project}>
        <p className='fs-4 px-5 py-4 m-0  _title' > Mis proyectos
        </p>
        <div className='_body'>

          {/* --------START CARD IMAGE---------- */}
          <div className='_smgCardImg'>
            <div className='content_img rounded bg-dark'>
              <div className='_imgs' >

                <div className='w-100 h-100 rounded _first' style={{
                  backgroundImage: `url(${stateProject[images.first]?.img})`,
                  zIndex: images.isChanged ? 0 : 1,
                  opacity: images.isChanged? 0: 1,
                  transition:"opacity .3s linear"
                }} ></div>
                <div className='w-100 h-100 rounded _second' style={{
                  backgroundImage: `url(${stateProject[images.second]?.img})`,
                  zIndex: images.isChanged ? 1 :0,
                  opacity: images.isChanged? 1: 0,
                  transition:"opacity .3s linear"
                }} ></div>
              </div>

            </div>
          </div>

          {/* ---------END CARD IMAGE------------- */}
          <div className='_content_card'>

            {
              stateProject.map((v, i) => (
                <div key={v.id} className="_subTitle" >
                  <div>
                    <p className=' m-0 _sub'
                      onMouseOver={() => onChangeImg(i)}
                      onClick={() => onOpenModal(i)} >{v.name}</p>
                    <div className='_content_info'>
                      {
                        v.info.split(',').map(v => (
                          <p key={v} className='fs-6 m-2 mx-3  text-end _info' > {v} </p>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </>

  )
})

interface PropDetails {
  stateAnimation: PropTypeAnimation,
  onCloseModal: () => void,
  onCloseLoading: () => void,
  stateProject: StateDataProject[],
  index: number,
  onChangeIndex: (index: number) => void
}

const Details = ({
  stateAnimation, onCloseLoading, onCloseModal, stateProject,
  index, onChangeIndex
}: PropDetails) => {

  const [animate, setAnimate] = useState("");
  const [state, setState] = useState<StateDataProject>();
  const isActiveRef = useRef(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardOriginRef = useRef<HTMLDivElement>(null);

  const onChangeCard = (dir: number) => {

    onChangeIndex(index + dir)
    cardOriginRef.current?.scrollTo(0, 0)
    isActiveRef.current = false;
  }

  const stateD = stateProject[index];

  const onAniamtedEnd = () => {
    setAnimate("")
    setState(stateProject[index])
    cardRef.current?.scrollTo(0, 0)
    isActiveRef.current = true;
  }

  const onScrollCard = (e: UIEvent<HTMLDivElement>) => {
    if (!isActiveRef.current) return;
    const target = e.target as HTMLDivElement;
    const cardCopy = cardRef.current as HTMLDivElement;
    cardCopy.scrollTop = target.scrollTop;
  }


  const [details, setdetails] = useState<{
    description?: string,
    sub_description: string,
    sections: { tool: string, description: string }[],
    images: string[]
  }>();

  const [detailsCopy, setdetailsCopy] = useState<{
    description?: string,
    sub_description: string,
    sections: { tool: string, description: string }[],
    images: string[]
  }>()

  useEffect(() => {

    if (!state?.details) return;
    const detail = JSON.parse(state.details)
    setdetailsCopy(detail)

  }, [state])

  useEffect(() => {

    if (!stateD.details) return;
    const detail = JSON.parse(stateD.details)
    setdetails(detail)

  }, [stateD])

  useEffect(() => {

    setState(stateProject[index])

  }, [])


  return (
    <div className={`
          _detailsProyect animate__animated ${stateAnimation.animation_content} }`}
      onAnimationEnd={onCloseModal}
    >
      <div
        className={`animate__animated ${stateAnimation.animation_child} _content`}>
        <button className='btn m-0 p-0 border-0 _btnClose'
          onClick={onCloseLoading} ><FaWindowClose fontSize={"2lh"} />  </button>

        <div className='_body ' id='_bodyDetails'>

          {state != undefined &&
            <div ref={cardRef} className={`_cardDetails_copy `} >
              <div className='_copy'>
                <p className='fs-1 fw-bold p-4 pt-5 m-0 _sub' >{state.name}
                  <span>{state.id === 5 && "- Deskot"}</span>
                  <span>{state.id === 4 && "- Web"}</span>
                  <span className='fs-6 mx-2'>{state.id === 1 && "(En desarrollo)"}</span>
                </p>
              </div>
              <p className=" rounded px-3 " >
                {state?.description}
              </p>

              <div className="m-2">
                <p>
                  {detailsCopy?.description}
                </p>
                <p className="fw-bolder">{detailsCopy?.sub_description}</p>
                {
                  detailsCopy?.sections.map(val => (
                    <div key={val.tool}>
                      <p className="px-2 rounded _subtitle">{val.tool}</p>
                      <p className='ps-4'>{val.description}</p>
                    </div>
                  ))
                }
              </div>
              <div>

                <div className="text-end my-4">

                  {
                    state?.urlweb &&
                    <a href={state.urlweb} target="_blank" className=" btn btn-dark mx-4">
                      <BsGlobe2 size={"2rem"} /> Ver Live
                    </a>
                  }
                  {
                    state?.urlgit &&
                    <a href={state.urlgit} target="_blank" className="btn btn-dark ">
                      <FaGithub size={"2rem"} /> Repositorio
                    </a>
                  }

                </div>

                {
                  detailsCopy?.images.map((val, i) => (
                    <div key={i} className=" mb-4" >
                      <img src={val} className="w-100 rounded" alt="" />
                    </div>
                  ))

                }
              </div>
            </div>
          }

          <div
            ref={cardOriginRef}
            className={`_cardDetails_original animate__animated ${animate}`}
            onAnimationEnd={onAniamtedEnd}
            onScroll={onScrollCard}
          >
            <div className='_original'>
              <p className='fs-1 p-4 fw-bold pt-5 m-0 _sub' >{stateD.name}
                <span>{stateD.id === 5 && "- Deskot"}</span>
                <span>{stateD.id === 4 && "- Web"}</span>
                <span className='fs-6 mx-2'>{stateD.id === 1 && "(En desarrollo)"}</span>

              </p>
            </div>
            <p className=" rounded px-3 " >
              {stateD?.description}
            </p>

            <div className="m-2">
              <p>
                {details?.description}
              </p>
              <p className="fw-bolder">{details?.sub_description}</p>
              {
                details?.sections.map(val => (
                  <div key={val.tool}>
                    <p className="px-2 rounded _subtitle">{val.tool}</p>
                    <p className='ps-4' >{val.description}</p>
                  </div>
                ))
              }
            </div>

            <div>

              <div className="text-end my-4">

                {
                  stateD?.urlweb &&
                  <a href={stateD.urlweb} target="_blank" className="btn btn-dark mx-4">
                    <BsGlobe2 size={"2rem"} /> Ver Live
                  </a>
                }
                {
                  stateD?.urlgit &&
                  <a href={stateD.urlgit} target="_blank" className="btn btn-dark ">
                    <FaGithub size={"2rem"} /> Repositorio
                  </a>
                }

              </div>

              {
                details?.images.map((val, i) => (
                  <div key={i} className=" mb-4" >
                    <img src={val} className="w-100 rounded" alt="" />
                  </div>
                ))

              }
            </div>
          </div>

        </div>

        <div className='bg-dark _footer01'>
          <div>
            <button
            onClick={() => {
              setAnimate("animate__fadeInLeft")
              onChangeCard(-1);
            }}
            className={`btn text-light fs-5 
             ${!index && "disabled border-dark"} 
             ${!isActiveRef.current && "disabled border-dark"} 
             `} ><GrFormPreviousLink /> {"Anterior"}</button>
          </div>
          <div>
            <button
            onClick={() => {
              setAnimate("animate__fadeInRight ")
              onChangeCard(+1)

            }}
            className={`btn text-light fs-5 
            ${index >= stateProject.length - 1 && "disabled border-dark"}
            ${!isActiveRef.current && "disabled border-dark"} 
            `} >{"Siguiente"} <GrFormNextLink /></button>
            </div>
        </div>
      </div>
    </div>
  )
}