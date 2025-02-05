import { memo, useCallback, useContext, useRef } from "react"

import { UidNodePage } from "./UidPageNode";
import { DataContext } from '../context/UserDataContext';
import { getCords_sphere } from "./component/geometryUtils";

export const Skils = memo(() => {

  const { state } = useContext(DataContext);
  const contentBodyRef = useRef<HTMLDivElement>(null);

  const cords = useCallback(() => getCords_sphere(state.stateSkills.length + 1, 75).map(state => {
    state.z < 0 && (state.z *= -1);
    return state
  }), [state.stateSkills]);

  const cordsLength = cords().length / 2;

  const cordPoint = useCallback(() => getCords_sphere(120 + 1, 75).map(state => {
    state.z < 0 && (state.z *= -1);
    return state
  }), [state.stateSkills]);


  const handleTransitionEnd = () => {
    console.log(0)
  }


  return (
    <div className=" content__skil__body" ref={contentBodyRef}
      id={UidNodePage.skil} >

      <div className="escena">

        <div className="cubo" onPlaying={handleTransitionEnd}>
          <div className="cara frente"></div>
          <div className="cara atras"></div>
          <div className="cara derecha"></div>
          <div className="cara izquierda"></div>
          <div className="cara arriba"></div>
          <div className="cara abajo"></div>
          {
            state.stateSkills.length > 0 &&
            state.stateSkills.map((val, i) =>
            (
              <div key={val.name + i} className="point _text"
                style={{
                  transform: `
                      rotate3d(1, 0, 0, ${i < cordsLength ? '-90deg' : '90deg'})
                      translate3d(${cords()[i].x}px, ${cords()[i].y}px, ${cords()[i].z}px)`,
                }} >{val.name} </div>
            )
            )}

          {
            state.stateSkills.length > 0 &&
            state.stateSkills.map((val, i) =>
            (
              <div key={val.name + i} className="point _text"
                style={{
                  transform: `
                      rotate3d(0, 1, 0, ${i < cordsLength ? '-180deg' : '0deg'})
                      translate3d(${cords()[i].x}px, ${cords()[i].y}px, ${cords()[i].z}px)`,
                }} >{val.name} </div>
            )
            )}

          {/* ADELANTE , ATRAS */}
          {
            cordPoint().length > 0 &&
            cordPoint().map((val, i) => (
              <div key={val.y + i} className="point _point"
                style={{
                  transform: `
                      rotate3d(1, 0, 0, ${i < cordsLength ? '-180deg' : '0deg'})
                      translate3d(${val.x}px, ${val.y}px, ${val.z}px)`,
                }} >.</div>
            ))
          }

          {/* DERECHA , IZQUIERDA */}
          {
            cordPoint().length > 0 &&
            cordPoint().map((val, i) => (
              <div key={val.y + i} className="point _point"
                style={{
                  transform: `
                      rotate3d(1, 0, 0, ${i < cordsLength ? '-90deg' : '90deg'})
                      translate3d(${val.x}px, ${val.y}px, ${val.z}px)`,
                }} >.</div>
            ))
          }

          {/* ARRIBA, ABAJO */}
          {
            cordPoint().length > 0 &&
            cordPoint().map((val, i) => (
              <div key={val.y + i} className="point _point"
                style={{
                  transform: `
                      rotate3d(0, 1, 0, ${i < cordsLength ? '-90deg' : '90deg'})
                      translate3d(${val.x}px, ${val.y}px, ${val.z}px)`,
                }} >.</div>
            ))
          }


        </div>

      </div>

      {/* SKILS */}
      <div className="skils">
        <ul className=" skil_name">
          <span className="ms-4 fs-6 --title">Experiencias</span>

          {
            state.stateSkills.length > 0 &&
            state.stateSkills.map((val, i) => {
              if (val.percentage)
                return <li key={val.color + i}>
                  <p className="mt-1"> {val.name}
                    <span
                      style={{
                        width: val.percentage + '%'
                      }}
                    ></span>  </p></li>
            })
          }

        </ul>
      </div >
      <p className="--footer" >
        "Lenguajes y tecnologías con los que he trabajado, algunos con mayor experiencia y otros explorados a nivel básico."
      </p>
    </div>
  )
})
