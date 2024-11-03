import { UidNodePage } from "./UidPageNode"

export const Home = () => {
  return (
    <div className="content__home" id={UidNodePage.home}>
      {/* <h1 className="title">BIENVENIDO</h1> */}
      <p className="description" >
        Soy Julano, actualmente culminando la carrera de desarrollo de software.
        Me apasiona crear aplicaciones web y móviles utilizando 
        tecnologías como JavaScript, 
        .NET y Kotlin. Siempre estoy buscando mejorar
         mis habilidades y aprender nuevas herramientas
          para desarrollar soluciones eficientes.
      </p>
    </div>
  )
}
