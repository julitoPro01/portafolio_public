import { UidNodePage } from "./UidPageNode"

import { ItemCard } from "./component/ProjectCarrucel"
import { SpaceHight } from "./component/Space"

export const Project = () => {

  // const itemRef = useRef<HTMLUListElement>(null);
  // const itemPreviousRef = useRef<HTMLLIElement>();


  // const onClickItem = (param: ProjectModel) => {

  //   const itemTarget = itemRef.current as HTMLUListElement;
  //   const itemTargetLi = itemTarget.querySelector(`[data-set=${param.title + param.id}]`) as HTMLLIElement;

  //   if (!itemPreviousRef.current)
  //     itemPreviousRef.current = itemTarget.querySelector('li') as HTMLLIElement;

  //   if (itemTargetLi === itemPreviousRef.current) return;

  //   itemTargetLi.classList.toggle('active');
  //   itemPreviousRef.current!.classList.toggle('active');

  //   itemPreviousRef.current = itemTargetLi;

  // }

  return (
    <div className=" content__body__project" id={UidNodePage.project}>
      <div className="container-lg p-0 content__ ">
        <SpaceHight/>
        <LayoutProject>
          {
            'dos'.split('').map(val=>(

              <ItemCard key={val} />
            ))
          }
        </LayoutProject>
        <SpaceHight/>

      </div>
    </div>
  )
}



const LayoutProject = ({ children }: any) => {

  return (
    <div className=" content__body rounded">
      <p className="p0"> {` <!DOCTYPE html>`} </p>
      <p className="p0"> {` <html lang="es">`} </p>
      <p className="p1"> {` <head>`} </p>
      <p className="p2"> {` <meta name="viewport" content="width=device-width, initial-scale=1.0"> `} </p>
      <p className="p2">{`<link rel="stylesheet" href="style.css">`}</p>
      <p className="p2"> {` <title>`} <span className="fs-2 text-light">My Portfolio</span> {'</title>'} </p>
      <p className="p1"> {` </head>`} </p>
      <p className="p1" > {`<body>`} </p>
      <p className="p2" > {` <header>`} </p>
      <p className="p3"> {`  <h1> `} <span className="text-light mx-2" >My Work </span> <span> {`</h1>`} </span> </p>
      <p className="p2"> {`  </header>`} </p>
      <p className="p2"> {` <main>`} </p>

      <div className="p3">
        {children}
      </div>

      <p className="p2">{`</main>`}</p>
      <p className="p2">{`<footer>`}</p>
      <p className="p3">{`<p> --- </p>`}</p>
      <p className="p2">{`</footer>`}</p>
      <p className="p2" >{`<script type="module" src="/src/main.tsx"></script>`}</p>
      <p className="p1">{`</body>`}</p>
      <p className="p0">{`</html>`}</p>

    </div>
  )
}