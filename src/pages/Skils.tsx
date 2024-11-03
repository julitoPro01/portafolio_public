import { memo, useEffect, useLayoutEffect, useRef, useState } from "react"

import { UidNodePage } from "./UidPageNode";
import { getCords_sphere} from "./component/geometryUtils";
import { animationPointsRotation, updateSizeNode } from "./component/SkilSphera";

let Node_contentSphere: HTMLDivElement;

const value = [1, 1, 11, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 77, 88, 99]

export const Skils = memo(() => {


  const contentBodyRef = useRef<HTMLDivElement>(null);

  const cords = getCords_sphere(value.length + 1, 100);
  // const cords = getCords_sphere(value.length, 100);
  animationPointsRotation(contentBodyRef,cords);

  useLayoutEffect(() => {

    if (!contentBodyRef.current) return;
    const { width } = contentBodyRef.current?.getBoundingClientRect()!;
    Node_contentSphere = contentBodyRef.current.querySelector('.content__sphere__content') as HTMLDivElement;
    updateSizeNode(width, Node_contentSphere)

  }, []);




  useLayoutEffect(() => {
    const target = contentBodyRef.current as HTMLDivElement;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        updateSizeNode(width, Node_contentSphere)
      }

    });
    resizeObserver.observe(target);
  }, []);

  return (
    <div className="content__skil__body" ref={contentBodyRef}
      id={UidNodePage.skil} >
      <div className="content__sphere__content">
        <div className="content__point">
          {
            value.map((val, i) => (

              <div key={i} className="point" >{'hello'}</div>
            ))
          }
          {/* <div className="mirrow">

          </div> */}
        </div>

        <div className="content__platform">
          <div className="platform">
          {
            value.map((val, i) => (

              <div key={i+0} className="point__copy" >{'hello'}</div>
            ))
          }
          </div>
        </div>

      </div>
    </div>
  )
})


