import imgProject from '../../assets/fondo01.webp'

export const ItemCard = () => {
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

          <img className="p3 my-2" src={imgProject} alt="img" />
          <figcaption className="p5">
            <span className='p p__' >{`<`}</span><span className='pn'>{`figcaption`}</span><span className='p__'>{`>`} </span>
            <span className='pv'> Description </span>
            <span className='p__' > {`</`}</span><span className='pn'>{`figcaption`}</span><span className='p__'>{`>`}</span>
          </figcaption>

        </figure>

        <p className="p4" ><span className='p__' >{`</`}</span><span className='pn'>{`figure`}</span><span className='p__'>{`>`}</span></p>

        <span className='p1 p__'>{'<'}</span><span className='pn'>{'button'}</span> <span className='pa'>{'type'}</span><span className='pn'>{'='}</span><span className='pva'>{'"---"'}</span><span className='p__'>{'>'} </span>
        <button type="button" className="btn btn-outline-light mx-3 p-0" data-bs-toggle="collapse" data-bs-target="#{project01}" aria-expanded="false" aria-controls="{project01}">
          <span className='pvbtn mx-3'>ver mas</span>
        </button>
        <span className=' p__'> {'</'}</span><span className='pn'>{'button'}</span>

        <p className="p1"><span className='p__'>{'<'}</span><span className='pn'>{'div'}</span><span className='pn'>{'>'}</span> </p>
        <p className="p2"><span className='pva'>{'---'}</span></p>
        {/* -------------COLLAPSE */}
        <div className="collapse mb-2" id="{project01}">
          <div className="card w-100 card-body content__cards ">
            {/* ----------CARD */}
            <div className="card w-100  p-2 content__cards_items" style={{ maxWidth: "700px" }}>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Mollitia aperiam nisi animi voluptatibus,
                provident quo iusto, distinctio dolorum corporis cupiditate molestiae modi quasi vero temporibus deserunt nesciunt corrupti dolorem iure.</p>
            </div>

            <div className="card w-100  content__cards_items" style={{ maxWidth: "700px" }}>
              <img src={imgProject} className="rounded" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>

          </div>
        </div>

        <p className="p1"><span className='p__'>{'</'}</span><span className='pn'>{'div'}</span><span className='pn'>{'>'}</span> </p>

      </div>

      <p className="p0" ><span className='p__'>{'</'}</span><span className='pn'>{'div'}</span><span className='p__'>{'>'}</span></p>
    </div>
  )
}