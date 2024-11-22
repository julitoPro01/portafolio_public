import { memo, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"

import { UidNodePage } from "./UidPageNode";
import { getCords_sphere} from "./component/geometryUtils";
import { animationPointsRotation, updateSizeNode } from "./component/SkilSphera";
import { DataContext } from '../context/UserDataContext';
import { StateDataSkills } from "../context/UserDataType";

let Node_contentSphere: HTMLDivElement;

export const Skils = memo(() => {

  const {state} = useContext(DataContext);
  const contentBodyRef = useRef<HTMLDivElement>(null);
  const [value, setvalue] = useState<StateDataSkills[]>([])

  const cords = getCords_sphere(value.length + 1, 100);
  // const cords = getCords_sphere(value.length, 100);
 animationPointsRotation(contentBodyRef,cords);

  useLayoutEffect(() => {

    if (!contentBodyRef.current) return;
    const { width } = contentBodyRef.current?.getBoundingClientRect()!;
    Node_contentSphere = contentBodyRef.current.querySelector('.content__sphere__content') as HTMLDivElement;
    updateSizeNode(width, Node_contentSphere)

  }, []);

  useEffect(() => {
    const target = contentBodyRef.current as HTMLDivElement;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
         updateSizeNode(width, Node_contentSphere)
      }

    });
    resizeObserver.observe(target);
  }, []);

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
            {
              value.map((val,i)=>{
                if(val.percentage)
                return  <li key={val.color+i}> <p style={{color:val.color}}> {val.name} <span 
                  style={{
                    background:val.color,width:val.percentage+'%'
                  }}
                  ></span>  </p></li>
              })
            }

          </ul>
      </div>

    </div>
  )
})


