import { UidNodePage } from "./UidPageNode"

import { ProjectModel, projectModel } from "../model/ProjectModel"
import { ProjectCarrucel } from "./component/ProjectCarrucel"
import { useRef } from "react"

export const Project = () => {

  const itemRef = useRef<HTMLUListElement>(null);
  const itemPreviousRef = useRef<HTMLLIElement>();


  const onClickItem=(param:ProjectModel)=>{

      const itemTarget = itemRef.current as HTMLUListElement;
      const itemTargetLi = itemTarget.querySelector(`[data-set=${param.title+param.id}]`) as HTMLLIElement;

      if(!itemPreviousRef.current)
          itemPreviousRef.current = itemTarget.querySelector('li') as HTMLLIElement;

      if(itemTargetLi === itemPreviousRef.current) return;

      itemTargetLi.classList.toggle('active');
      itemPreviousRef.current!.classList.toggle('active');
      
      itemPreviousRef.current = itemTargetLi;

  }

  return (
    <div className=" content__body__project" id={UidNodePage.project}>
      <div className="container-lg p-0 content__">
        <div className="content__body">

          <div className="row  content__content">
            {/* ________PREVIEW______ */}
            <div className=" col-md-6 col-12  content__preview__slider" >
              {
                projectModel.map((val, i) => (
                  <ProjectCarrucel key={val.title + i} props={val} />
                ))
              }


            </div>
            {/* _______ITEM_________ */}

            <div className="col-12 col-md-6  content__item_project">
              <ul ref={itemRef} >

                {
                  projectModel.map((val, i) => (
                    <li className={`${ !i && 'active' }`} data-set={val.title+val.id} 
                    key={val.img+i} onClick={()=>onClickItem(val)}  >
                      <a href={`#${val.title+val.id}`}>

                      <p className="m-0 p-0 fs-2" > {val.title}</p>
                      <div className="m-0 p-0">
                        {
                          val.skils.map((skil,i)=>(
                            <span key={skil+i} className=" rounded-pill px-2 mx-1" >{skil}</span>
                          ))
                        }
                      </div>
                        </a>
                    </li>
                  ))
                }
                

              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
