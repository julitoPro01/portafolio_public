import { UidNodePage } from "./UidPageNode"

export const Contact = () => {
  return (
    <div className="content__contact" id={UidNodePage.contact}>

      <form action="mailto:zosimo179@gmail.com" method="post" >
        <h2 className="title" >
          <button type="submit" className=" __btn">
            <span>
              CONTACTAME
            </span>
          </button>
        </h2>
      </form>
      <p  >zosimo179@gmail.com</p>
      <p>
        <a className="link link-light" href="https://api.whatsapp.com/send?phone=51986875779&text=Hola,%20acabo%20de%20ver%20tu%20portafolio..." target="_blank">WhatsApp</a>
      </p>
    </div>
  )
}
