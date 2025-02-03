import { useEffect, useRef } from 'react';
import { PointCordsProps, rotateSphera } from '../pages/component/geometryUtils';


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
    

 interface CreatePoinElementProps{
    content:HTMLDivElement,className_child:string,values:string[]
 }
 
 export const createElement_animatePointSphera=(cords:PointCordsProps[])=>{

    const angleRef= useRef({angleX:0.0,angleY:360});
    const pointRef = useRef<NodeListOf<Element>>();
     
     const createPoint_elements = ({content, className_child}:CreatePoinElementProps) => {
         const cord02 = cords;
         let point;
         cord02.forEach((num) => {
             
             point = document.createElement('div');
             point.innerHTML = `<p class="ball">${0}</p>`

             point.style.color = "red"
             point.style.transform = `translate3d(${num.x}px, ${num.y}px, ${num.z}px)`
             point.classList.add(className_child);
             content.appendChild(point)
             
            });
            pointRef.current=content.querySelectorAll("."+className_child);
        }

    useEffect(() => {
        let animationFrameId:number;
        if(!pointRef.current) return;
        console.log("animando")

        const points = pointRef.current as NodeListOf<HTMLDivElement>;
        const toIntString=(num:number)=>(num|0).toString();
      
        const animateRotate = () => {
            const {angleX,angleY} = angleRef.current;
            const getRotate = rotateSphera(cords, angleX,angleY);
        
            
            getRotate.forEach((num, i) => {
            
                points[i].style.transform = `translate3d(${num.x}px, ${num.y}px, ${num.z+100}px)`
                points[i].style.zIndex=toIntString(num.z);
                points[i].style.transition="all .5s linear"
        
            })
        
            angleRef.current.angleX=angleX+0.2;
            angleRef.current.angleY=angleY-0.2;
            if (angleX > 360) (angleRef.current.angleX = 0);
            if (angleY < 0) (angleRef.current.angleY = 360);
            
        
          animationFrameId = requestAnimationFrame(animateRotate)
        }
       animationFrameId = requestAnimationFrame(animateRotate)
    
      return () => {
        cancelAnimationFrame(animationFrameId)
      }
    }, [pointRef.current])
    
    
    return{
        createPoint_elements
    }
    }
