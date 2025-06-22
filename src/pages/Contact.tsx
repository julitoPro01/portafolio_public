import { useRef } from "react"
import { UidNodePage } from "./UidPageNode"

export const Contact = () => {

  const ref_mailto = useRef<HTMLButtonElement>(null)

  return (
    <div className="content__contact" id={UidNodePage.contact}>

      <h2 className="fs-2 fw-bolder m-2 pb-5" >CONTACTAME</h2>

      <form action="mailto:zosimo179@gmail.com" method="post" id="_sendMail" >
        
      </form>

      <button className="d-none rounded link link-dark " ref={ref_mailto} form="_sendMail"  type="submit">
        zosimo179@gmail.com
      </button>

      <p onClick={()=>{
        ref_mailto.current?.click()
      }} >
        <a className="link link-dark" type="submit"  target="_blank" >zosimo179@gmail.com</a>
      </p>
      <p>
        <a className="link link-dark" href="https://api.whatsapp.com/send?phone=51986875779&text=Hola,%20acabo%20de%20ver%20tu%20portafolio..." target="_blank">WhatsApp</a>
      </p>
      <p>
        <a className="link link-dark" target="_blank" href="https://pe.linkedin.com/in/zosimo-torres-botello-74bb54238?trk=profile-badge">Linkedin</a>
      </p>
    </div>
  )
}
