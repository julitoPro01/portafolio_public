import { RefObject, useContext, useEffect, useRef } from 'react';
import { PointCordsProps, rotateSphera } from './geometryUtils';
import { ThemeContext } from '../../context/UserThemeContext';


export const updateSizeNode=(width:number,container:HTMLDivElement)=>{
     if(width>600)        
            container.style.transform="scale(0.85,0.85)";
        else if(width>500)        
            container.style.transform="scale(0.8,0.8)";
        else if(width>400)        
            container.style.transform="scale(0.7,0.7)"
       else if(width>300)        
        container.style.transform="scale(0.6,0.6)";
    }
    

let content_appMain:HTMLDivElement;
let contentPoint:HTMLDivElement;
let contentPlatform:HTMLDivElement;
let points:NodeListOf<HTMLDivElement>;
let pointsCopy:NodeListOf<HTMLDivElement>;
        
export const animationPointsRotation=(contentBodyRef:RefObject<HTMLDivElement>,cords:PointCordsProps[])=>{

  const angleRef = useRef({ angleX: 0.0, angleY: 360 });
  const {state} = useContext(ThemeContext);


        const updatePointRotation=(points:NodeListOf<HTMLDivElement>)=>{


            const { angleX, angleY } = angleRef.current;
                const getRotate = rotateSphera(cords, angleX, angleY);
        
                getRotate.forEach((num, i) => {
                  let z = num.z < 0 ? (num.z - 100) : (num.z + 150)
                  points[i].style.transform = `translate3d(${num.x}px, ${num.y}px, ${z}px)`
                  points[i].style.zIndex = Math.floor(num.z).toString();
                  points[i].style.transition = "all .5s linear"
        
                })
        
                angleRef.current.angleX = (angleX + 10) % 360;
                angleRef.current.angleY = (angleY + 5) % 360;
          }

        const updatePointCopyRotation=(points:NodeListOf<HTMLDivElement>)=>{

            const { angleX, angleY } = angleRef.current;
                const getRotate = rotateSphera(cords, angleX, angleY);
        
                getRotate.forEach((num, i) => {
                  let z = num.z < 0 ? (num.z - 100) : (num.z+150)
                  points[i].style.transform = `translate3d(${num.x}px, ${num.y}px, ${z}px)`
                  points[i].style.zIndex = Math.floor(num.z).toString();
                  points[i].style.transition = "all .5s linear"
        
                })
        
          }
          

    useEffect(() => {
        const target = contentBodyRef.current as HTMLDivElement;

        content_appMain = document.querySelector('.content__appMain') as HTMLDivElement;
        
        contentPoint = target.querySelector('.content__point') as HTMLDivElement;
        points = contentPoint.querySelectorAll('.point') as NodeListOf<HTMLDivElement>;

        contentPlatform = target.querySelector('.platform') as HTMLDivElement;
        pointsCopy = contentPlatform.querySelectorAll('.point__copy') as NodeListOf<HTMLDivElement>;
          
    }, [contentBodyRef.current])
          


  useEffect(() => {
    let animationFrameId: number=0;
    let clearTimeOut: number;
    let previousTime = 0;
    let elapsed = 0

    
    if (!contentPoint) return;
    if (!points.length) return;

    const animateRotate = (timestamp: number) => {

      const delta = timestamp - previousTime;
      previousTime = timestamp;

      elapsed += delta;

      if (elapsed >= 200) {

        // TODO: ANIMATION ELEMENT POINT
        updatePointRotation(points)
        updatePointCopyRotation(pointsCopy)
        
        elapsed = 0;

      }

      animationFrameId = requestAnimationFrame(animateRotate)
    }

    if(animationFrameId) {
      
      cancelAnimationFrame(animationFrameId)
    } 

    const stopAnimate = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId =0;
      if (clearTimeOut) clearTimeout(clearTimeOut);

      clearTimeOut = setTimeout(() => {
        startAnimate()
      }, 200)

    }
    const startAnimate = () => {
      animationFrameId = requestAnimationFrame(animateRotate)
    }

    
    content_appMain.addEventListener("scroll", stopAnimate)

    if(!state.controlAnimation_letters.skill){

      startAnimate()
    }else{
   
      if(animationFrameId!==0) {

        cancelAnimationFrame(animationFrameId)
      } 
    }

    return () => {
      content_appMain.removeEventListener("scroll", stopAnimate);
      clearTimeout(clearTimeOut)
      cancelAnimationFrame(animationFrameId)
      animationFrameId=0;
    }
  }, [cords,state.controlAnimation_letters])
        
    }
        
