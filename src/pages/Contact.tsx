import { FormEvent, useState } from "react";
import { UidNodePage } from "./UidPageNode"
import emailjs from "emailjs-com"

export const Contact = () => {

  const [response, setresponse] = useState({ reject: false, response: false, loading: false })

  const handleSendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = e.currentTarget.querySelectorAll("input, textarea") as any;

    setresponse(() => ({ response: false, reject: false, loading: true }))
    inputs.forEach((input: any) => {
      input.disabled = true
    })

    emailjs.sendForm(
      'service_fjs3bgx',
      'template_8l616pr',
      e.currentTarget,
      'A0qlneO0U5eQ_LRGY'
    )
      .then(() => {
        inputs.forEach((input: any) => {
          input.disabled = false
          input.value = ""
        })
        setresponse(() => ({ response: true, reject: false, loading: false }))

      }, () => {
         inputs.forEach((input: any) => {
          input.disabled = false
        })
        setresponse(() => ({ reject: true, response: true, loading: false }))
      });

  }



  return (
    <div className="content__contact mt-5" id={UidNodePage.contact}>

      <h2 className="fs-2 fw-bolder m-2 pb-5" >CONTACTAME</h2>
      <div className="__contactEmail px-2">

      <form id="formulario" onSubmit={handleSendEmail}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            name="from_email"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Dirección de correo electrónico</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            name="message"
            style={{ height: '100px' }}
            required
          />
          <label htmlFor="floatingTextarea2">Comentario</label>
        </div>
        <br />
        <button type="submit" className="btn btn-outline-dark">Enviar</button>
        <br />
      </form>
      </div>

      <div className="content_response mt-2 text-end">

        <p className=" text-dark _text_loading" style={{ opacity: response.loading ? "1" : "0" }}>Enviando...</p>
        <p className=" text-success _text_response" style={{ opacity: response.response ? "1" : "0" }}>¡Mensage Enviado!</p>
        <p className=" badge text-danger _text_error" style={{ opacity: response.reject ? "1" : "0" }}>Ocurrio un error en el servidor, intente mas tarde.</p>
      </div>

      <hr />
      <hr />
      <div className="d-flex w-100 content_link" >
        <p className="mx-2">
          <a className="link link-dark" href="https://api.whatsapp.com/send?phone=51986875779&text=Hola%2C%20vi%20tu%20portafolio.%20%C2%BFEst%C3%A1s%20disponible%20para%20hablar%3F" target="_blank">WhatsApp</a>
        </p>
        <p className="mx-2">
          <a className="link link-dark" target="_blank" href="https://pe.linkedin.com/in/zosimo-torres-botello-74bb54238?trk=profile-badge">Linkedin</a>
        </p>
      </div>
    </div>
  )
}
