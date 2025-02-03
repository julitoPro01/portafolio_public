import { useContext, useEffect } from "react";
import { UidNodePage } from "./UidPageNode";
import { DataContext } from '../context/UserDataContext';
import { getSkills_db,getDevSkills_db, getProject_db } from "../store/dbProvider";

export const Home = () => {

  const {dispatch_getSkills,dispatch_getDevSkills,dispatch_getProject} = useContext(DataContext);

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
    .then(result=>{
      const items=result.sort((a,b)=>a.id - b.id);
       dispatch_getProject(items)
      })

  
  }, [])
  

  return (
    <div className=" content__home" id={UidNodePage.home}>
      <p className="description fs-5 ms-sm-0 mb-5 ms-5 ps-md-0 ps-4"  >
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
