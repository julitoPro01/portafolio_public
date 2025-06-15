import { useContext, useEffect, useState } from "react";
import { UidNodePage } from "./UidPageNode";
import { DataContext } from '../context/UserDataContext';
import { getSkills_db, getDevSkills_db, getProject_db, getProfile_db } from "../store/dbProvider";
import { ThemeContext } from "../context/UserThemeContext";

export const Home = () => {

  const { dispatch_getSkills, dispatch_getDevSkills, dispatch_getProject } = useContext(DataContext);
  const { state } = useContext(ThemeContext)
  const [profile, setProfile] = useState<any>("")

  useEffect(() => {

    getSkills_db()
      .then(dispatch_getSkills);

  }, []);


  useEffect(() => {

    getDevSkills_db()
      .then(dispatch_getDevSkills)

  }, [])

  useEffect(() => {

    getProject_db()
      .then(result => {
        const items = result.sort((a, b) => a.id - b.id);
        dispatch_getProject(items)
      })

  }, []);

  useEffect(() => {

    getProfile_db().then(setProfile)

  }, []);

  return (
    <div className=" content__home " id={UidNodePage.home}>



      <div className="  _content_more mb-5">
        <div className="_conten_title">
          <p className={`_title animate__animated ${!state.isScreenLock && "animate__lightSpeedInLeft"}`}>Sobre <span> mí </span> </p>
          <p className="_sub"> Me llamo Zosimo. Un programador, creador y solucionador de problemas.  </p>
        </div>
        <div className=" _profile">
          <div className={`_imgHome`}>
            <img src={profile} alt="perfil" className=" w-100 " />

          </div>
        </div>
      </div>

      <p className="description p-4 py-2"  >
        Soy un apasionado desarrollador de software en formación,
        con experiencia en Node.js, React, y .NET. 
        Actualmente estoy culminando mi carrera en Desarrollo de Software,
        y aunque aún no he tenido experiencia laboral formal, he trabajado en 
        proyectos personales que me han permitido aplicar y consolidar mis habilidades 
        técnicas.
      </p>
      <p className="description p-4 py-2">
        Mi enfoque principal es crear soluciones robustas, modernas y escalables.
         Me entusiasma enfrentar desafíos,
         aprender nuevas tecnologías y seguir mejorando como desarrollador.
      </p>

      <p  className="description p-4 py-2 fw-medium">
        Mis principales áreas de interés incluyen:
      </p>
      <ul className="">
        <li className="description p-4 py-2" >Desarrollo web frontend y backend.</li>
        <li className="description p-4 py-2" >Diseño e implementación de aplicaciones dinámicas y funcionales.</li>
        <li className="description p-4 py-2" >Exploración de herramientas y tecnologías modernas como AWS y DevOps.</li>
      </ul>
      <p className="description p-4 py-1" >Fuera del código, me apasiona mantenerme actualizado con las últimas tendencias tecnológicas y colaborar en proyectos innovadores.</p>
      <p className="description p-4 py-1 " >Estoy emocionado por empezar mi carrera profesional y contribuir al desarrollo de soluciones que hagan la diferencia.</p>

         <button className="btn   border-0">
          <a className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="https://drive.google.com/file/d/1XFEJm8tF49sPtXWBlLawf4izdvc4f1OV/view?usp=drive_link"
          target="_blank" >
          {/* <PiCertificateLight size={"2em"} /> */}
          <span className="_text mx-2"> Ver Certificaciones</span>
          </a>
        </button>

        <button className="btn   border-0">
          <a className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="https://drive.google.com/file/d/1zdFMk5Na73rAukD0GD-LBw5lokbFCbB0/view?usp=drive_link"
            target="_blank" >
          {/* <BsPersonLinesFill size={"2em"} /> */}
          <span className="_text mx-2"> Ver Curriculum Vitae </span>
          </a>
        </button>
    </div>
  )
}
