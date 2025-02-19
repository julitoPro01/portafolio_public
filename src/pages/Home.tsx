import { useContext, useEffect, useState } from "react";
import { UidNodePage } from "./UidPageNode";
import { DataContext } from '../context/UserDataContext';
import { getSkills_db, getDevSkills_db, getProject_db, getHome_db } from "../store/dbProvider";

export const Home = () => {

  const { dispatch_getSkills, dispatch_getDevSkills, dispatch_getProject } = useContext(DataContext);

  const [txt, settxt] = useState<any>("")

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
    
    getHome_db().then(settxt)
  
  }, []);

  return (
    <div className=" content__home" id={UidNodePage.home}>
        <p className="loading_img">
        </p>
      <p className="description fs-5 mb-5 ms-5 ps-md-0 ps-4"  >
       {
        !txt 
        ? "Loading..."
        : txt
       }
      </p>
    </div>
  )
}
