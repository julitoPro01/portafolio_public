import { useContext, useEffect, useRef, useState } from 'react';
import { StateDataProject } from '../../context/UserDataType'
import { DataContext } from '../../context/UserDataContext';

export const ItemCard = ({ item }: { item: StateDataProject }) => {

  const refContent = useRef<HTMLDivElement>(null);
  const { dispatch_setCord_ofProyect, state } = useContext(DataContext);
  const [isImgLoad, setisImgLoad] = useState(false);

  const handleOpenContent = () => {
    if (!refContent.current) return;

    const target = refContent.current as HTMLDivElement;

    target.classList.toggle('container_contend_toogle');

    const { left, top, height, width } = target.getBoundingClientRect();

    dispatch_setCord_ofProyect({
      top, left,
      height: height, width: width,
      id: item.name.split(' ').join(''), open: !state.stateCordOfProyect.open,
      item: item.id
    })
  };


  useEffect(() => {
    const img = new Image();
    if( !item.img) return;

    img.src = item.img;
    img.onload = function(){
      setisImgLoad(true)
    }
  }, [item.img])
  

  return (

    <div className="rounded itemCard  my-2 ps-0" >

      <div className="card_active" ></div>

      <p className="p0" >
        <span className='p__' >{`<`}</span>
        <span className='pn'>{`div`}</span>
        <span className='pa'> {`id`}</span>
        <span className='pn'>{`=`}</span>
        <span className='pva'> {`"---"`} </span>
        <span className='p__'> {`>`} </span>
      </p>

      <p className="p4" ><span className='p__' >{`<`}</span><span className='pn'>{`figure`}</span><span className='p__'>{`>`}</span>  </p>
      <p className="p5" >
        <span className='p__' >{`<`}</span><span className='pn'>{`img`}</span> <span className='pa'> {`src`}</span><span className='pn'>{`=`}</span><span className='pva'> {`"---"`} </span>
        <span className='pa'>{`alt`}</span><span className='pn'>{`=`}</span><span className='pva'> {`"---"`} </span><span className='p__'> {`>`} </span>
      </p>
      <div>

        <figure className="m-0">
          {
            isImgLoad 
            ? <img className="p3 my-2" src={item.img} alt={item.name} />
            : <p className='p3 my-2 text-light' > Cargando imagen... </p>
          }
           
          
          <figcaption className="p5">
            <span className='p p__' >{`<`}</span><span className='pn'>{`figcaption`}</span><span className='p__'>{`>`} </span>
            <span className='pv'> {item.name} </span>

            <span className='p__' > {`</`}</span><span className='pn'>{`figcaption`}</span><span className='p__'>{`>`}</span>
          </figcaption>

        </figure>

        <p className="p4" ><span className='p__' >{`</`}</span><span className='pn'>{`figure`}</span><span className='p__'>{`>`}</span></p>

        <span className='p1 p__'>{'<'}</span><span className='pn'>{'button'}</span> <span className='pa'>{'type'}</span><span className='pn'>{'='}</span><span className='pva'>{'"---"'}</span><span className='p__'>{'>'} </span>

        <button type="button" className="btn btn-outline-light mx-3 p-0"
          onClick={handleOpenContent} id={`${item.name.split(' ').join('')}`} >
          <span className='pvbtn mx-3'>ver mas</span>
        </button>
        <span className=' p__'> {'</'}</span><span className='pn'>{'button'}</span>
        <span className=' p__'>{'>'}</span>


        {/* -------------COLLAPSE */}

        <div className='container_contend' ref={refContent} >
          <p className="p1"><span className='p__'>{'<'}</span><span className='pn'>{'div'}</span><span className='pn'>{'>'}</span> </p>
          <p className="p2"><span className='pva'>{'---'}</span></p>
          <p className="p1"><span className='p__'>{'</'}</span><span className='pn'>{'div'}</span><span className='pn'>{'>'}</span> </p>
        </div>
      </div>
      <div className="w-100 mt-2 ms-2 d-flex align-items-center">
              {
                item?.urlgit &&
                <a href={item?.urlgit} target="_blank" className="mx-2 text-light" ><i className="bi bi-github"></i></a>
              }
              {
                item?.urlweb &&
                <a href={item?.urlweb} target="_blank" className="mx-2 text-light" ><i className="bi bi-globe-americas"></i></a>
              }
            </div>
      <p className="p0" ><span className='p__'>{'</'}</span><span className='pn'>{'div'}</span><span className='p__'>{'>'}</span></p>
    </div>
  )
}
