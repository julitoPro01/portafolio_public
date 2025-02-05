import { memo, useContext, useRef } from "react"

import { UidNodePage } from "./UidPageNode";
import { useAnimationPointsRotation } from "./component/SkilSphera";
import { DataContext } from '../context/UserDataContext';

export const Skils = memo(() => {

  const { state } = useContext(DataContext);
  const contentBodyRef = useRef<HTMLDivElement>(null);

  useAnimationPointsRotation(contentBodyRef, state.stateSkills.length+1);

  const handleTransitionEnd = () => {
    console.log(0)
  }

  return (
    <div className=" content__skil__body" ref={contentBodyRef}
      id={UidNodePage.skil} >

      <div className="escena">

        <div className="cubo" onPlaying={handleTransitionEnd}>
          <div className="cara frente">
            {
                state.stateSkills.length > 0 &&
                state.stateSkills.map((val, i) => (
                  <div key={val.name + i} className="point" >{val.name}</div>
                ))
              }

          </div>
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
