import { memo, useContext, useEffect, useRef, useState } from "react"

import { UidNodePage } from "./UidPageNode";
import { getCords_sphere} from "./component/geometryUtils";
import { animationPointsRotation } from "./component/SkilSphera";
import { DataContext } from '../context/UserDataContext';
import { StateDataSkills } from "../context/UserDataType";

export const Skils = memo(() => {

  const {state} = useContext(DataContext);
  const contentBodyRef = useRef<HTMLDivElement>(null);
  const [value, setvalue] = useState<StateDataSkills[]>([])

  const cords = getCords_sphere(value.length + 1, 100);
 animationPointsRotation(contentBodyRef,cords);


  useEffect(() => {
    
    setvalue(state.stateSkills)
  
  }, [state.stateSkills])
  
  return (
    <div className=" content__skil__body" ref={contentBodyRef}
      id={UidNodePage.skil} >
      <div className="content__sphere__content">
        <div className="content__point">
          {
            value.map((val, i) => (
              <div key={val.name+i} className="point" >{val.name}</div>
            ))
          }
        </div>

        <div className="content__platform">
          <div className="platform">
          {
            value.map((val, i) => (
              <div key={val.name+i} className="point__copy" >{val.name}</div>
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
              value.map((val,i)=>{
                if(val.percentage)
                return  <li key={val.color+i}>
                   <p className="mt-1" style={{color:val.color}}> {val.name}
                     <span 
                  style={{
                    background:val.color,width:val.percentage+'%'
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


