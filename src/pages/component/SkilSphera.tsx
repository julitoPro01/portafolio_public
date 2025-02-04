import { RefObject, useCallback, useContext, useEffect, useRef } from 'react';
import { getCords_sphere, rotateSphera } from './geometryUtils';
import { ThemeContext } from '../../context/UserThemeContext';



let content_appMain: HTMLDivElement;
let contentPoint: HTMLDivElement;
let points: NodeListOf<HTMLDivElement>;

export const useAnimationPointsRotation = (
  contentBodyRef: RefObject<HTMLDivElement>,
  // cords: PointCordsProps[],
  numState:number
  ) => {

  const { state } = useContext(ThemeContext);

  const cords = useCallback(() => getCords_sphere(numState,75), [numState]);
  
  const angleRef = useRef({ angleX: 0.0, angleY: 360 });


  const updatePointRotation = (points: NodeListOf<HTMLDivElement>) => {


    const { angleX, angleY } = angleRef.current;
    const getRotate = rotateSphera(cords(), angleX, angleY);

    getRotate.forEach((num, i) => {
      const point = points[i];
      let z = num.z < 0 ? (num.z - 100) : (num.z + 150)
      
      point.style.transform = `translate3d(${num.x}px, ${num.y}px, ${z}px)`
      point.style.zIndex = Math.floor(num.z).toString();
      if (z < 0)
        point.style.color = "rgba(255, 255, 255, 0.5)"
      else
        point.style.color = "white"
    })

    angleRef.current.angleX = (angleX + 10) % 360;
    angleRef.current.angleY = (angleY + 5) % 360;
  }



  useEffect(() => {
    const target = contentBodyRef.current as HTMLDivElement;
    content_appMain = document.querySelector('.content__appMain') as HTMLDivElement;

    contentPoint = target.querySelector('.frente') as HTMLDivElement;
    points = contentPoint.querySelectorAll('.point') as NodeListOf<HTMLDivElement>;

  }, [contentBodyRef.current, cords])



  useEffect(() => {
    let animationFrameId: number = 0;
    let clearTimeOut: ReturnType<typeof setTimeout>;
    let previousTime = 0;
    let elapsed = 0

    if (!contentPoint) return;
    if (!points.length) return;

    const animateRotate = (timestamp: number) => {

      const delta = timestamp - previousTime;
      previousTime = timestamp;

      elapsed += delta;

      if (elapsed >= 500) {
        // TODO: ANIMATION ELEMENT POINT
        updatePointRotation(points)
        elapsed = 0;

      }

      animationFrameId = requestAnimationFrame(animateRotate)
    }

    if (animationFrameId) {

      cancelAnimationFrame(animationFrameId)
    }

    const stopAnimate = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = 0;
      if (clearTimeOut) clearTimeout(clearTimeOut);

      clearTimeOut = setTimeout(() => {
        startAnimate()
      }, 200)

    }
    const startAnimate = () => {
      animationFrameId = requestAnimationFrame(animateRotate)
    }


    content_appMain.addEventListener("scroll", stopAnimate)

    if (!state.controlAnimation_letters.skill) {

      startAnimate()
    } else {

      if (animationFrameId !== 0) {

        cancelAnimationFrame(animationFrameId)
      }
    }

    return () => {
      content_appMain.removeEventListener("scroll", stopAnimate);
      clearTimeout(clearTimeOut)
      cancelAnimationFrame(animationFrameId)
      animationFrameId = 0;
    }
  }, [
    cords
  ])

}

