import { UidNodePage } from "./UidPageNode"

export const Contact = () => {
  return (
    <div className="content__contact" id={UidNodePage.contact}>

      <form action="mailto:zosimo179@gmail.com" method="post" >
        <h2 className="m-4 title" >
          <button type="submit" className="border border-0 p-3 rounded  __btn">
              CONTACTAME
          </button>
        </h2>
      </form>
      <p  >zosimo179@gmail.com</p>
      <p>
        <a className="link link-dark" href="https://api.whatsapp.com/send?phone=51986875779&text=Hola,%20acabo%20de%20ver%20tu%20portafolio..." target="_blank">WhatsApp</a>
      </p>
    </div>
  )
}
