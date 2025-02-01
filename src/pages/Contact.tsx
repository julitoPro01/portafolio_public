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
        <a className="link link-light" href="https://w.app/7q4m2j" target="_blank">Whatsapp</a>
      </p>
    </div>
  )
}
